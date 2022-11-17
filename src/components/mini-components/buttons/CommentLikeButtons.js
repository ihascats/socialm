import Icons from '../../Icons';

export default function CommentLikeButtons({
  like,
  liked,
  likeCount,
  postData,
}) {
  const icons = Icons();
  return (
    <div className="flex justify-end gap-6">
      <button
        onClick={(event) => {
          event.preventDefault();
        }}
        className="flex gap-1 text-neutral-900"
      >
        {icons.comment}
        {`${postData.replies.length}`}
      </button>
      <button
        onClick={async (event) => {
          event.preventDefault();
          like();
        }}
        className={`flex gap-1 ${
          liked
            ? 'fill-red-500 text-red-500 dark:fill-rose-300 dark:text-rose-300'
            : 'fill-neutral-900 text-neutral-900'
        }`}
      >
        {icons.like}
        {`${likeCount}`}
      </button>
    </div>
  );
}
