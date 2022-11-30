import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentCard from './components/CommentCard';
import Nav from './components/Nav';
import PostCard from './components/PostCard';
import WideNav from './components/WideNav';
import { fetchPost } from './fetch_requests/post.fetch';
import { fetchUserInformation } from './fetch_requests/user.fetch';

export default function Post() {
  const [postInformation, setPostInformation] = useState();
  const [signedUserInfo, setSignedUserInfo] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetchUserInformation().then(
      function (value) {
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
    fetchPost(id).then(
      function (value) {
        if (value.response.status === 200) {
          setPostInformation(value.post);
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);

  const [mobile, setMobile] = useState(true);

  function screenWidth(event) {
    if (event.target.innerWidth > 768) setMobile(false);
    if (event.target.innerWidth <= 768) setMobile(true);
  }

  useEffect(() => {
    if (window.innerWidth > 768) setMobile(false);
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
      {mobile ? null : (
        <WideNav setPostInformation={setPostInformation} postId={id} />
      )}
      <ul
        className={`bg-gradient-to-br from-yellow-200 to-pink-300 dark:from-indigo-600 dark:to-green-600  max-w-[500px] w-full ${
          mobile ? 'min-h-screen-nav' : 'min-h-screen'
        }`}
      >
        {postInformation ? (
          <PostCard
            post={postInformation}
            user={signedUserInfo}
            setPostInformation={setPostInformation}
            postInformation={postInformation}
          />
        ) : null}
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
        <Nav setPostInformation={setPostInformation} postId={id} />
      ) : null}
    </div>
  );
}
