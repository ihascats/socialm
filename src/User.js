import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommentCard from './components/CommentCard';
import Icons from './components/Icons';
import Nav from './components/Nav';
import PostCard from './components/PostCard';
import PostUploading from './components/PostUploading';
import UserHeader from './components/UserHeader';
import WideNav from './components/WideNav';
import { fetchImage } from './fetch_requests/img.fetch';
import { fetchUserPosts } from './fetch_requests/post.fetch';
import { fetchUserInformation } from './fetch_requests/user.fetch';
import Loading from './Loading';
import { checkConnectionAndNavigate } from './fetch_requests/connection.fetch';
import { isLocalStorageMobile, screenWidth } from './screen_size/isMobile';

export default function User() {
  const [userInformation, setUserInformation] = useState();
  const [signedUserInfo, setSignedUserInfo] = useState();
  const [userPosts, setUserPosts] = useState();
  const [showPosts, setShowPosts] = useState(true);
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.Authorization) {
      navigate(`${process.env.PUBLIC_URL}/signIn`, { replace: true });
    }
  });

  async function update() {
    try {
      const value = await fetchUserInformation(navigate, id);
      if (value.response.status === 200) {
        setUserInformation(value.user);
        const value2 = await fetchUserPosts(value.user._id);
        if (value2.response.status === 200) {
          setUserPosts(value2.posts_comments);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    update();
    fetchUserInformation(navigate).then(
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
  }, [signedUserInfo, id]);

  useEffect(() => {
    if (userInformation) {
      const pictureString = userInformation.profile_picture.slice(0, 4);
      if (pictureString !== 'blob' && pictureString !== 'http') {
        fetchImage(userInformation, setUserInformation);
      }
    }
  }, [userInformation, signedUserInfo]);

  const [mobile, setMobile] = useState(isLocalStorageMobile());

  useEffect(() => {
    if (localStorage.mobile) {
      setMobile(isLocalStorageMobile());
    } else {
      const isMobile = window.innerWidth <= 768;
      setMobile(isMobile);
      localStorage.mobile = isMobile;
    }
    window.addEventListener('resize', (event) => screenWidth(event, setMobile));
  }, []);

  const [uploading, setUploading] = useState([]);

  function newUpload(bool) {
    const clone = structuredClone(uploading);
    if (bool) {
      clone.push(1);
      setUploading(clone);
    } else {
      clone.pop();
      setUploading(clone);
    }
  }

  const [connected, setConnected] = useState(localStorage.connected);

  useEffect(() => {
    checkConnectionAndNavigate(setConnected, navigate);
  }, []);

  const icons = Icons();

  return connected ? (
    <div
      className={`w-full hide-scroll dark:bg-neutral-900 dark:text-neutral-50 dark:fill-neutral-400 ${
        mobile
          ? 'min-h-nav grid justify-items-center'
          : 'min-h-screen flex justify-center'
      }`}
    >
      {mobile ? null : (
        <WideNav setUserPosts={setUserPosts} newUpload={newUpload} />
      )}
      <div
        className={`w-full border-x-2 border-neutral-900 dark:border-neutral-400 max-w-[500px] ${
          mobile ? 'w-[100vw]' : 'min-h-screen h-screen'
        }`}
      >
        {userInformation && signedUserInfo ? (
          <UserHeader
            userInformation={userInformation}
            signedUserInfo={signedUserInfo}
            setSignedUserInfo={setSignedUserInfo}
          />
        ) : (
          <div className="h-20"></div>
        )}
        {userPosts && signedUserInfo ? (
          <div>
            <button
              onClick={() => {
                setShowPosts(true);
                update();
              }}
              className="w-1/2 border-b-2 border-neutral-900 dark:border-neutral-400 py-2"
            >
              Posts
            </button>
            <button
              onClick={() => {
                setShowPosts(false);
                update();
              }}
              className="w-1/2 border-b-2 border-neutral-900 dark:border-neutral-400 py-2"
            >
              Comments
            </button>
            <ul
              className={`${
                mobile
                  ? 'min-h-screen-user max-h-screen-user-nav overflow-auto hide-scroll'
                  : 'min-h-screen-user-nav h-screen-user-wide overflow-auto hide-scroll'
              }`}
            >
              {uploading.length > 0 && showPosts
                ? uploading.map((upload, index) => (
                    <PostUploading key={`upload-${index}`} />
                  ))
                : null}
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
              className="w-1/2 border-b-2 border-neutral-900 dark:border-neutral-400 py-2"
            >
              Posts
            </button>
            <button
              onClick={() => {
                setShowPosts(false);
                update();
              }}
              className="w-1/2 border-b-2 border-neutral-900 dark:border-neutral-400 py-2"
            >
              Comments
            </button>
            <ul
              className={`flex flex-col font-mono items-center justify-center dark:fill-neutral-50 ${
                mobile ? 'min-h-screen-user' : 'min-h-screen-user-nav'
              }`}
            >
              {icons.loading}
              Profile Loading..
            </ul>
          </div>
        )}
      </div>
      {mobile ? (
        <Nav setUserPosts={setUserPosts} newUpload={newUpload} />
      ) : null}
    </div>
  ) : (
    <Loading />
  );
}
