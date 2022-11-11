import Icons from './Icons';

export default function PostList({ post }) {
  const icons = Icons();
  return (
    <div className="p-2 border-b-2 border-neutral-900 dark:border-lime-300">
      <div className="flex justify-between">
        <div className="flex items-end gap-2 border-b-2 border-neutral-900 pb-2">
          <img
            alt=""
            src={post.author.profile_picture}
            className="rounded-full h-10 border-2 border-neutral-900"
          ></img>
          <h1 className="font-mono">{post.author.username}</h1>
          {Math.abs(Date.parse(post.createdAt) - Date.now()) / 36e5 > 23 ? (
            <h2 className="text-sm font-bold opacity-60 font-mono">
              {`${Date(post.createdAt).split(' ')[1].trim()} ${Date(
                post.createdAt,
              )
                .split(' ')[2]
                .trim()}`}
            </h2>
          ) : (
            <h2 className="text-sm font-bold opacity-60 font-mono">
              {`${Math.floor(
                Math.abs(Date.parse(post.createdAt) - Date.now()) / 36e5,
              )}h`}
            </h2>
          )}
        </div>
        <button>{icons.moreOptions}</button>
      </div>
      <div className="pt-2">
        <p>{post.post_text || post.comment_text}</p>
      </div>
      <div className="flex justify-end gap-6">
        {post.comment_text ? null : (
          <button className="flex gap-1">
            {icons.comment}
            {`${post.replies.length}`}
          </button>
        )}
        <button className="flex gap-1">
          {icons.like}
          {`${post.likes.length}`}
        </button>
      </div>
    </div>
  );
}
