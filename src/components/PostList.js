import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icons from './Icons';

export default function PostList({ post, user }) {
  const icons = Icons();
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [liked, setLiked] = useState(post.likes.includes(user._id));

  async function like(event) {
    const link = post.comment_text
      ? `${process.env.REACT_APP_APILINK}/post/comment/${post._id}/like`
      : `${process.env.REACT_APP_APILINK}/post/${post._id}/like`;
    const response = await fetch(link, {
      mode: 'cors',
      method: 'PUT',
      headers: new Headers({
        Authorization: localStorage.Authorization,
      }),
    });
    if (response.status === 200) {
      const json = await response.json(); //extract JSON from the http response
      setLikeCount(json.likeCount);
    }
    setLiked((prevState) => !prevState);
  }

  return (
    <Link
      to={post.comment_text ? `/post/comment/${post._id}` : `/post/${post._id}`}
    >
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
          <button
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            {icons.moreOptions}
          </button>
        </div>
        <div className="pt-2">
          <p>{post.post_text || post.comment_text}</p>
        </div>
        <div className="flex justify-end gap-6">
          {post.comment_text ? null : (
            <button
              onClick={(event) => {
                event.preventDefault();
              }}
              className="flex gap-1 text-neutral-900"
            >
              {icons.comment}
              {`${post.replies.length}`}
            </button>
          )}
          <button
            onClick={async (event) => {
              event.preventDefault();
              like(event);
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
      </div>
    </Link>
  );
}
