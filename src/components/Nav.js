import { useState } from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <nav className="grid grid-cols-5 items-end justify-items-center sticky p-2 bottom-0 w-full h-fit border-t-4 bg-lime-300 fill-neutral-900 border-neutral-900 dark:bg-neutral-900 dark:fill-lime-300 dark:border-lime-300">
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
  );
}
