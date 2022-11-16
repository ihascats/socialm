import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchImage } from '../fetch_requests/img.fetch';
import { fetchPutLike, fetchPutPost } from '../fetch_requests/post.fetch';
import Icons from './Icons';
import MoreOptionsMenu from './MoreOptionsMenu';

export default function PostList({ post, user }) {
  const icons = Icons();
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [image, setImage] = useState();
  const [menuVisible, setMenuVisible] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const textArea = useRef();
  const [postData, setPostData] = useState(post);

  async function like() {
    const json = await fetchPutLike(post);
    setLikeCount(json.likeCount);
    setLiked((prevState) => !prevState);
  }

  useEffect(() => {
    if (postData.author.profile_picture.slice(0, 4) !== 'http') {
      fetchImage(postData.author, setImage);
    }
  }, [postData.author]);

  return (
    <Link draggable={false} to={`/post/${postData._id}`}>
      <div className="p-2 border-b-2 border-neutral-900 dark:border-lime-300">
        <div className="flex justify-between">
          <div className="flex items-end gap-2 border-b-2 border-neutral-900 pb-2 max-w-full">
            <Link
              as={Link}
              to={
                user._id === postData.author._id
                  ? `/user`
                  : `/user/${postData.author._id}`
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
                  src={postData.author.profile_picture}
                  className="rounded-full w-10 h-10 border-2 border-neutral-900"
                ></img>
              )}
            </Link>
            <Link
              as={Link}
              to={
                user._id === postData.author._id
                  ? `/user`
                  : `/user/${postData.author._id}`
              }
              className="font-mono overflow-clip text-ellipsis"
            >
              {postData.author.username}
            </Link>
            {Math.abs(Date.parse(postData.createdAt) - Date.now()) / 36e5 >
            23 ? (
              <h2 className="text-sm font-bold opacity-60 font-mono whitespace-nowrap">
                {`${Date(postData.createdAt).split(' ')[1].trim()} ${Date(
                  postData.createdAt,
                )
                  .split(' ')[2]
                  .trim()}`}
              </h2>
            ) : (
              <h2 className="text-sm font-bold opacity-60 font-mono whitespace-nowrap">
                {`${Math.floor(
                  Math.abs(Date.parse(postData.createdAt) - Date.now()) / 36e5,
                )}h`}
              </h2>
            )}
          </div>
          {user._id === postData.author._id ? (
            <button
              onClick={(event) => {
                event.preventDefault();
                setMenuVisible(true);
              }}
            >
              {icons.moreOptions}
            </button>
          ) : null}
          {menuVisible ? (
            <MoreOptionsMenu
              setMenuVisible={setMenuVisible}
              setEditPost={setEditPost}
            />
          ) : null}
        </div>
        <div className="pt-2">
          {editPost ? (
            <textarea
              ref={textArea}
              onClick={(event) => {
                event.preventDefault();
              }}
              className="w-full bg-transparent border-b-2 border-b-green-600 resize-none h-20 outline-offset-4"
              defaultValue={postData.post_text}
            ></textarea>
          ) : (
            <p>{postData.post_text}</p>
          )}
        </div>
        {editPost ? (
          <div className="flex justify-end gap-2">
            <button
              onClick={(event) => {
                event.preventDefault();
                setEditPost(false);
              }}
              className="border-b-2 border-red-500 px-4 py-1 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={async (event) => {
                event.preventDefault();
                const updatedPostData = await fetchPutPost(
                  postData._id,
                  textArea.current.value,
                );
                setPostData(updatedPostData.post.post);
                setEditPost(false);
              }}
              className="border-b-2 border-green-500 px-4 py-1 rounded-md"
            >
              Save
            </button>
          </div>
        ) : (
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
        )}
      </div>
    </Link>
  );
}
