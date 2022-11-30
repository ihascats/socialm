import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommentCard from './components/CommentCard';
import Nav from './components/Nav';
import PostCard from './components/PostCard';
import UserHeader from './components/UserHeader';
import WideNav from './components/WideNav';
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
    update();
  }, [signedUserInfo]);

  useEffect(() => {
    if (userInformation) {
      if (userInformation.profile_picture.slice(0, 4) !== 'blob')
        if (userInformation.profile_picture.slice(0, 4) !== 'http') {
          fetchImage(userInformation, setUserInformation);
        }
    }
  }, [userInformation, signedUserInfo]);

  const [mobile, setMobile] = useState(false);

  function screenWidth(event) {
    if (event.target.innerWidth > 768) setMobile(false);
    if (event.target.innerWidth <= 768) setMobile(true);
  }

  useEffect(() => {
    if (window.innerWidth > 768) setMobile(false);
    if (window.innerWidth <= 768) setMobile(true);
    window.onresize = screenWidth;
  });

  return (
    <div
      className={`w-full hide-scroll ${
        mobile
          ? 'min-h-nav grid justify-items-center'
          : 'min-h-screen flex justify-center'
      }`}
    >
      {mobile ? null : <WideNav setUserPosts={setUserPosts} />}
      <div
        className={`dark:text-neutral-50 dark:bg-neutral-900 max-w-[500px] w-full ${
          mobile ? null : 'min-h-screen h-screen'
        }`}
      >
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
            <ul
              className={`bg-gradient-to-br from-blue-200 to-purple-300 dark:from-indigo-600 dark:to-green-600 ${
                mobile
                  ? 'min-h-screen-user'
                  : 'min-h-screen-user-nav h-screen-user-wide overflow-auto hide-scroll'
              }`}
            >
              {showPosts
                ? userPosts.posts.map((post) => (
                    <PostCard
                      key={post._id}
                      post={post}
                      user={signedUserInfo}
                      setUserPosts={setUserPosts}
                    />
                  ))
                : userPosts.comments.map((comment) => (
                    <Link
                      key={comment._id}
                      draggable={false}
                      to={`/post/${comment.parent}`}
                    >
                      <CommentCard
                        comment={comment}
                        user={signedUserInfo}
                        setUserPosts={setUserPosts}
                      />
                    </Link>
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
            <ul
              className={`bg-gradient-to-br from-blue-200 to-purple-300 dark:from-indigo-600 dark:to-green-600 ${
                mobile ? 'min-h-screen-user' : 'min-h-screen-user-nav'
              }`}
            ></ul>
          </div>
        )}
      </div>
      {mobile ? <Nav setUserPosts={setUserPosts} /> : null}
    </div>
  );
}
