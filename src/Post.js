import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommentCard from './components/CommentCard';
import CommentUploading from './components/CommentUploading.js';
import Icons from './components/Icons';
import Nav from './components/Nav';
import PostCard from './components/PostCard';
import WideNav from './components/WideNav';
import { fetchPost } from './fetch_requests/post.fetch';
import { fetchUserInformation } from './fetch_requests/user.fetch';
import { checkConnectionAndNavigate } from './fetch_requests/connection.fetch';
import Loading from './Loading';
import { isLocalStorageMobile, screenWidth } from './screen_size/isMobile';

export default function Post() {
  const [postInformation, setPostInformation] = useState();
  const [signedUserInfo, setSignedUserInfo] = useState();
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!localStorage.Authorization) {
          navigate(`${process.env.PUBLIC_URL}/signIn`, { replace: true });
          return;
        }

        const userInfoResponse = await fetchUserInformation(navigate);
        if (userInfoResponse.response.status === 200) {
          setSignedUserInfo(userInfoResponse.user);
        }

        const postResponse = await fetchPost(id);
        if (postResponse.response.status === 200) {
          setPostInformation(postResponse.post);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

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

  function newCommentUpload(bool) {
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
        <WideNav
          setPostInformation={setPostInformation}
          postId={id}
          newCommentUpload={newCommentUpload}
        />
      )}
      <ul
        className={`max-w-[500px] w-full border-x-2 border-neutral-900 dark:border-neutral-400 ${
          mobile
            ? 'min-h-screen-nav'
            : 'min-h-screen overflow-auto h-screen hide-scroll'
        }`}
      >
        {postInformation && signedUserInfo ? (
          <PostCard
            post={postInformation}
            user={signedUserInfo}
            setPostInformation={setPostInformation}
            postInformation={postInformation}
            newCommentUpload={newCommentUpload}
          />
        ) : (
          <div className="w-full h-full flex flex-col font-mono items-center justify-center dark:fill-neutral-50">
            {icons.loading}
            Post Loading..
          </div>
        )}
        {uploading.length > 0 && postInformation
          ? uploading.map((upload, index) => (
              <CommentUploading key={`upload-${index}`} />
            ))
          : null}
        {postInformation
          ? postInformation.replies
              .reverse()
              .map((comment) => (
                <CommentCard
                  key={comment._id}
                  comment={comment}
                  user={signedUserInfo}
                  setPostInformation={setPostInformation}
                />
              ))
          : null}
      </ul>
      {mobile ? (
        <Nav
          setPostInformation={setPostInformation}
          postId={id}
          newCommentUpload={newCommentUpload}
        />
      ) : null}
    </div>
  ) : (
    <Loading />
  );
}
