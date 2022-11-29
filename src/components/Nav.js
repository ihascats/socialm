import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icons from './Icons';
import AdditionalNavOptions from './mini-components/AdditionalNavOptions';
import NewComment from './NewComment';
import NewPost from './NewPost';

export default function Nav({
  setTimeline,
  setUserPosts,
  setPostInformation,
  postId,
}) {
  const [newPostVisible, setNewPostVisible] = useState(false);
  const [newCommentVisible, setNewCommentVisible] = useState(false);
  const [viewAdditional, setViewAdditional] = useState(false);
  const icons = Icons();

  const navigate = useNavigate();

  return localStorage.Authorization ? (
    <nav
      className={`grid grid-cols-5 items-end justify-items-center sticky p-2 bottom-0 w-full h-16 border-t-4 bg-lime-300 fill-neutral-900 border-neutral-900 dark:bg-neutral-900 dark:fill-lime-300 dark:border-lime-300`}
    >
      <Link to={`/timeline`}>{icons.timeline}</Link>
      <Link to={`/userSearch`}>{icons.friendList}</Link>
      {setPostInformation ? (
        <button
          onClick={() => {
            setNewCommentVisible(true);
          }}
          className={`fixed bottom-20 right-3 bg-green-400 rounded-full p-2`}
        >
          {icons.bigComment}
        </button>
      ) : (
        <button
          className={`fixed ${
            viewAdditional ? `bottom-[168px]` : `bottom-20` //92+64+12=1
          } right-3 bg-green-400 rounded-full p-2 transition-all`}
          onClick={() => {
            setNewPostVisible(true);
          }}
        >
          {icons.newPost}
        </button>
      )}
      <button>{icons.notifications}</button>
      <Link to={`/conversations`}>{icons.chat}</Link>
      <button
        onClick={() => {
          setViewAdditional((prev) => !prev);
        }}
      >
        {icons.menuUp}
      </button>
      {newPostVisible ? (
        <NewPost
          setNewPostVisible={setNewPostVisible}
          setTimeline={setTimeline}
          setUserPosts={setUserPosts}
        />
      ) : null}
      {newCommentVisible ? (
        <NewComment
          setNewCommentVisible={setNewCommentVisible}
          postId={postId}
          setTimeline={setTimeline}
          setUserPosts={setUserPosts}
          setPostInformation={setPostInformation}
        />
      ) : null}
      {viewAdditional ? <AdditionalNavOptions /> : null}
    </nav>
  ) : (
    <nav
      className={`grid grid-cols-2 items-end justify-items-center sticky p-2 bottom-0 w-full h-fit border-t-4 bg-lime-300 fill-neutral-900 border-neutral-900 dark:bg-neutral-900 dark:fill-lime-300 dark:border-lime-300`}
    >
      <a
        href={`${process.env.REACT_APP_APILINK}/auth/google`}
        className="h-full flex gap-4 text-lg items-center"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
          alt="google logo"
          className="h-12"
        />
        Sign In
      </a>
      <button
        onClick={() => {
          localStorage.setItem('Authorization', process.env.REACT_APP_GUEST);
          navigate(`${process.env.PUBLIC_URL}/`, { replace: true });
        }}
        className="h-full text-lg items-center"
      >
        Sign In as Guest
      </button>
    </nav>
  );
}
