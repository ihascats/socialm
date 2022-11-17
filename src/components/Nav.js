import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icons from './Icons';
import NewPost from './NewPost';

export default function Nav({ timeline, setTimeline, setUserPosts }) {
  const [newPostVisible, setNewPostVisible] = useState(false);
  const showTimeline = false || timeline;
  const icons = Icons();
  return (
    <nav className="grid grid-cols-5 items-end justify-items-center sticky p-2 bottom-0 w-full h-fit border-t-4 bg-lime-300 fill-neutral-900 border-neutral-900 dark:bg-neutral-900 dark:fill-lime-300 dark:border-lime-300">
      {showTimeline ? (
        <Link to={`/timeline`}>{icons.timeline}</Link>
      ) : (
        <Link to={`/user`}>{icons.profile}</Link>
      )}
      <button>{icons.friendList}</button>
      <button
        onClick={() => {
          setNewPostVisible(true);
        }}
      >
        {icons.newPost}
      </button>
      <button>{icons.notifications}</button>
      <button>{icons.settings}</button>
      {newPostVisible ? (
        <NewPost
          setNewPostVisible={setNewPostVisible}
          setTimeline={setTimeline}
          setUserPosts={setUserPosts}
        />
      ) : null}
    </nav>
  );
}
