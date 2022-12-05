import { useEffect } from 'react';
import Icons from './Icons';

export default function MoreOptionsMenu({
  setMenuVisible,
  setEditPost,
  setEditComment,
  setDeletePost,
  setDeleteComment,
}) {
  const icons = Icons();

  useEffect(() => {
    window.ontouchmove = () => {
      setMenuVisible(false);
      window.ontouchmove = null;
    };
    window.ontouchend = () => {
      setMenuVisible(false);
      window.ontouchend = null;
    };
  }, []);

  return (
    <div
      onMouseLeave={() => {
        setMenuVisible(false);
      }}
      onClick={(event) => {
        event.preventDefault();
      }}
      onTouchEnd={(event) => {
        event.stopPropagation();
      }}
      className="absolute grid right-0 w-32 bg-lime-200 py-1 font-mono rounded-lg dark:text-neutral-900 dark:fill-neutral-900 "
    >
      <button
        onClick={() => {
          setMenuVisible(false);
          setEditPost ? setEditPost(true) : setEditComment(true);
        }}
        className="flex gap-2 hover:bg-lime-500 px-2"
      >
        {icons.edit}
        <p>Edit</p>
      </button>
      <button
        onClick={() => {
          setMenuVisible(false);
          setDeletePost ? setDeletePost(true) : setDeleteComment(true);
        }}
        className="flex gap-2 hover:bg-lime-500 px-2"
      >
        {icons.deleteSVG}
        <p>Delete</p>
      </button>
    </div>
  );
}
