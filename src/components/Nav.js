import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icons from './Icons';
import NewComment from './NewComment';
import NewPost from './NewPost';

export default function Nav({
  timeline,
  setTimeline,
  setUserPosts,
  setPostInformation,
  postId,
}) {
  const [newPostVisible, setNewPostVisible] = useState(false);
  const [newCommentVisible, setNewCommentVisible] = useState(false);
  const showTimeline = false || timeline;
  const icons = Icons();

  const navigate = useNavigate();

  return localStorage.Authorization ? (
    <nav
      className={`grid grid-cols-6 items-end justify-items-center sticky p-2 bottom-0 w-full h-fit border-t-4 bg-lime-300 fill-neutral-900 border-neutral-900 dark:bg-neutral-900 dark:fill-lime-300 dark:border-lime-300`}
    >
      {showTimeline ? (
        <Link to={`/timeline`}>{icons.timeline}</Link>
      ) : (
        <Link to={`/user`}>{icons.profile}</Link>
      )}
      <Link to={`/userSearch`}>{icons.friendList}</Link>
      {setPostInformation ? (
        <button
          onClick={() => {
            setNewCommentVisible(true);
          }}
        >
          {icons.bigComment}
        </button>
      ) : (
        <button
          onClick={() => {
            setNewPostVisible(true);
          }}
        >
          {icons.newPost}
        </button>
      )}
      <button>{icons.notifications}</button>
      <Link to={`/conversations`}>{icons.chat}</Link>
      {newPostVisible ? (
        <NewPost
          setNewPostVisible={setNewPostVisible}
          setTimeline={setTimeline}
          setUserPosts={setUserPosts}
        />
      ) : null}
      <button
        onClick={() => {
          localStorage.removeItem('Authorization');
          navigate(`${process.env.PUBLIC_URL}/`, { replace: true });
        }}
      >
        {icons.logout}
      </button>
      {newCommentVisible ? (
        <NewComment
          setNewCommentVisible={setNewCommentVisible}
          postId={postId}
          setTimeline={setTimeline}
          setUserPosts={setUserPosts}
          setPostInformation={setPostInformation}
        />
      ) : null}
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
