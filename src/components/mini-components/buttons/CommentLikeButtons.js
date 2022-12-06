import { useState } from 'react';
import Icons from '../../Icons';

export default function CommentLikeButtons({
  like,
  liked,
  likeCount,
  repliesCount,
  setNewCommentVisible,
}) {
  const [updating, setUpdating] = useState(false);
  const icons = Icons();
  return (
    <div className="flex justify-end gap-6">
      <button
        onClick={(event) => {
          event.preventDefault();
          setNewCommentVisible(true);
        }}
        className="flex gap-1 text-neutral-900 dark:text-neutral-400"
      >
        {icons.comment}
        {`${repliesCount}`}
      </button>
      <button
        onClick={async (event) => {
          event.preventDefault();
          if (updating) return;
          setUpdating(true);
          const likeUpdated = await like();
          if (likeUpdated === true) {
            setUpdating(false);
          }
        }}
        className={`flex gap-1 ${
          liked
            ? 'fill-red-500 text-red-500'
            : 'fill-neutral-900 text-neutral-900 dark:fill-neutral-400 dark:text-neutral-400'
        }`}
      >
        {updating ? icons.smallLoading : icons.like}
        {`${likeCount}`}
      </button>
    </div>
  );
}
