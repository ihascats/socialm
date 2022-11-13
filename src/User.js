import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from './components/Nav';
import PostList from './components/PostList';
import UserHeader from './components/UserHeader';
import {
  fetchImage,
  fetchUserInformation,
  fetchUserPosts,
} from './fetch_requests';

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
      ) : null}
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
          <ul className="bg-gradient-to-br from-yellow-200 to-pink-300 min-h-screen dark:from-indigo-600 dark:to-green-600">
            {showPosts
              ? userPosts.posts.map((post) => (
                  <PostList key={post._id} post={post} user={signedUserInfo} />
                ))
              : userPosts.comments.map((post) => (
                  <PostList key={post._id} post={post} user={signedUserInfo} />
                ))}
          </ul>
        </div>
      ) : null}

      <Nav timeline={true} />
    </div>
  );
}
