import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentCard from './components/CommentCard';
import Nav from './components/Nav';
import PostCard from './components/PostCard';
import UserHeader from './components/UserHeader';
import { fetchImage } from './fetch_requests/img.fetch';
import { fetchUserPosts } from './fetch_requests/post.fetch';
import { fetchUserInformation } from './fetch_requests/user.fetch';

export default function User() {
  const [userInformation, setUserInformation] = useState();
  const [signedUserInfo, setSignedUserInfo] = useState();
  const [userPosts, setUserPosts] = useState();
  const [showPosts, setShowPosts] = useState(true);
  const { id } = useParams();

  function update() {
    fetchUserInformation(id).then(
      async function (value) {
        if (value.response.status === 200) {
          setUserInformation(value.user);
          fetchUserPosts(value.user._id).then(
            function (value) {
              if (value.response.status === 200) {
                setUserPosts(value.posts_comments);
              }
            },
            function (error) {
              console.log(error);
            },
          );
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }

  useEffect(() => {
    update();
    fetchUserInformation().then(
      async function (value) {
        if (value.response.status === 200) {
          setSignedUserInfo(value.user);
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);

  useEffect(() => {
    if (userInformation) {
      if (userInformation.profile_picture.slice(0, 4) !== 'blob')
        if (userInformation.profile_picture.slice(0, 4) !== 'http') {
          fetchImage(userInformation, setUserInformation);
        }
    }
  }, [userInformation]);

  return (
    <div className="dark:text-neutral-50 dark:bg-neutral-900">
      {userInformation ? (
        <UserHeader
          userInformation={userInformation}
          signedUserInfo={signedUserInfo}
          setSignedUserInfo={setSignedUserInfo}
        />
      ) : (
        <div className="h-20 bg-lime-300"></div>
      )}
      {userPosts ? (
        <div>
          <button
            onClick={() => {
              setShowPosts(true);
              update();
            }}
            className="w-1/2 border-b-2 border-neutral-900 dark:border-lime-300 py-2"
          >
            Posts
          </button>
          <button
            onClick={() => {
              setShowPosts(false);
              update();
            }}
            className="w-1/2 border-b-2 border-neutral-900 dark:border-lime-300 py-2"
          >
            Comments
          </button>
          <ul className="bg-gradient-to-br from-emerald-200 to-purple-300 min-h-screen-user dark:from-indigo-600 dark:to-green-600">
            {showPosts
              ? userPosts.posts.map((post) => (
                  <PostCard key={post._id} post={post} user={signedUserInfo} />
                ))
              : userPosts.comments.map((comment) => (
                  <CommentCard
                    key={comment._id}
                    comment={comment}
                    user={signedUserInfo}
                  />
                ))}
          </ul>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setShowPosts(true);
              update();
            }}
            className="w-1/2 border-b-2 border-neutral-900 dark:border-lime-300 py-2"
          >
            Posts
          </button>
          <button
            onClick={() => {
              setShowPosts(false);
              update();
            }}
            className="w-1/2 border-b-2 border-neutral-900 dark:border-lime-300 py-2"
          >
            Comments
          </button>
          <ul className="bg-gradient-to-br from-emerald-200 to-purple-300 min-h-screen-user dark:from-indigo-600 dark:to-green-600"></ul>
        </div>
      )}

      <Nav timeline={true} />
    </div>
  );
}
