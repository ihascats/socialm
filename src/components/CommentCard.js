import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchImage } from '../fetch_requests/img.fetch';
import { fetchPutComment, fetchPutLike } from '../fetch_requests/post.fetch';
import Icons from './Icons';
import MoreOptionsMenu from './MoreOptionsMenu';

export default function CommentCard({ comment, user }) {
  const icons = Icons();
  const [likeCount, setLikeCount] = useState(comment.likes.length);
  const [liked, setLiked] = useState(comment.likes.includes(user._id));
  const [image, setImage] = useState();
  const [menuVisible, setMenuVisible] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const textArea = useRef();
  const [commentData, setCommentData] = useState(comment);

  async function like() {
    const json = await fetchPutLike(comment);
    setLikeCount(json.likeCount);
    setLiked((prevState) => !prevState);
  }

  useEffect(() => {
    if (comment.author.profile_picture.slice(0, 4) !== 'http') {
      fetchImage(comment.author, setImage);
    }
  }, []);

  return (
    <div className="bg-neutral-900 bg-opacity-20 border-l-4 border-l-blue-500 pl-4 p-2 border-b-2 border-neutral-900 dark:border-lime-300">
      <div className="flex justify-between">
        <div className="flex items-end gap-2 border-b-2 border-neutral-900 pb-2 max-w-full">
          <Link
            as={Link}
            to={
              user._id === comment.author._id
                ? `/user`
                : `/user/${comment.author._id}`
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
                src={comment.author.profile_picture}
                className="rounded-full w-10 h-10 border-2 border-neutral-900"
              ></img>
            )}
          </Link>
          <Link
            as={Link}
            to={
              user._id === comment.author._id
                ? `/user`
                : `/user/${comment.author._id}`
            }
            className="font-mono overflow-clip text-ellipsis"
          >
            {comment.author.username}
          </Link>
          {/* date */}
          {Math.abs(Date.parse(comment.createdAt) - Date.now()) / 36e5 > 23 ? (
            <h2 className="text-sm font-bold opacity-60 font-mono whitespace-nowrap">
              {`${Date(comment.createdAt).split(' ')[1].trim()} ${Date(
                comment.createdAt,
              )
                .split(' ')[2]
                .trim()}`}
            </h2>
          ) : (
            <h2 className="text-sm font-bold opacity-60 font-mono whitespace-nowrap">
              {`${Math.floor(
                Math.abs(Date.parse(comment.createdAt) - Date.now()) / 36e5,
              )}h`}
            </h2>
          )}
          {/* date */}
        </div>
        {user._id === comment.author._id ? (
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
            setEditComment={setEditComment}
          />
        ) : null}
      </div>
      <div className="pt-2">
        {editComment ? (
          <textarea
            ref={textArea}
            onClick={(event) => {
              event.preventDefault();
            }}
            className="w-full bg-transparent border-b-2 border-b-green-600 resize-none h-20 outline-offset-4"
            defaultValue={commentData.comment_text}
          ></textarea>
        ) : (
          <p>{commentData.comment_text}</p>
        )}
      </div>
      {editComment ? (
        <div className="flex justify-end gap-2">
          <button
            onClick={(event) => {
              event.preventDefault();
              setEditComment(false);
            }}
            className="border-b-2 border-red-500 px-4 py-1 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={async (event) => {
              event.preventDefault();
              const updatedcommentData = await fetchPutComment(
                commentData._id,
                textArea.current.value,
              );
              setCommentData(updatedcommentData.comment.comment);
              setEditComment(false);
            }}
            className="border-b-2 border-green-500 px-4 py-1 rounded-md"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex justify-end gap-6">
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
  );
}
