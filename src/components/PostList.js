import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchImage } from '../fetch_requests/img.fetch';
import { fetchPutLike } from '../fetch_requests/post.fetch';
import Icons from './Icons';
import MoreOptionsMenu from './MoreOptionsMenu';

export default function PostList({ post, user }) {
  const icons = Icons();
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [image, setImage] = useState();
  const [menuVisible, setMenuVisible] = useState(false);

  async function like() {
    const json = await fetchPutLike(post);
    setLikeCount(json.likeCount);
    setLiked((prevState) => !prevState);
  }

  useEffect(() => {
    if (post.author.profile_picture.slice(0, 4) !== 'http') {
      fetchImage(post.author, setImage);
    }
  }, []);

  return (
    <Link
      to={post.comment_text ? `/post/comment/${post._id}` : `/post/${post._id}`}
    >
      <div className="p-2 border-b-2 border-neutral-900 dark:border-lime-300">
        <div className="flex justify-between">
          <div className="flex items-end gap-2 border-b-2 border-neutral-900 pb-2 max-w-full">
            <Link
              as={Link}
              to={
                user._id === post.author._id
                  ? `/user`
                  : `/user/${post.author._id}`
              }
            >
              {image ? (
                <img
                  alt=""
                  src={image.profile_picture}
                  className="rounded-full w-10 h-10 border-2 border-neutral-900"
                ></img>
              ) : (
                <img
                  alt=""
                  src={post.author.profile_picture}
                  className="rounded-full w-10 h-10 border-2 border-neutral-900"
                ></img>
              )}
            </Link>
            <Link
              as={Link}
              to={
                user._id === post.author._id
                  ? `/user`
                  : `/user/${post.author._id}`
              }
              className="font-mono overflow-clip text-ellipsis"
            >
              {post.author.username}
            </Link>
            {Math.abs(Date.parse(post.createdAt) - Date.now()) / 36e5 > 23 ? (
              <h2 className="text-sm font-bold opacity-60 font-mono whitespace-nowrap">
                {`${Date(post.createdAt).split(' ')[1].trim()} ${Date(
                  post.createdAt,
                )
                  .split(' ')[2]
                  .trim()}`}
              </h2>
            ) : (
              <h2 className="text-sm font-bold opacity-60 font-mono whitespace-nowrap">
                {`${Math.floor(
                  Math.abs(Date.parse(post.createdAt) - Date.now()) / 36e5,
                )}h`}
              </h2>
            )}
          </div>
          {user._id === post.author._id ? (
            <button
              onClick={(event) => {
                event.preventDefault();
                setMenuVisible(true);
              }}
            >
              {icons.moreOptions}
            </button>
          ) : null}
          {menuVisible ? <MoreOptionsMenu /> : null}
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
      </div>
    </Link>
  );
}
