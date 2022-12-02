import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCommentImage, fetchImage } from '../fetch_requests/img.fetch';
import { fetchPutComment, fetchPutLike } from '../fetch_requests/post.fetch';
import DeleteComment from './DeleteComment';
import Icons from './Icons';
import ImageInput from './mini-components/ImageInput';
import MoreOptionsMenu from './MoreOptionsMenu';

export default function CommentCard({
  comment,
  user,
  setPostInformation,
  setUserPosts,
}) {
  const icons = Icons();
  const [likeCount, setLikeCount] = useState(comment.likes.length);
  const [liked, setLiked] = useState(comment.likes.includes(user._id));
  const [image, setImage] = useState();
  const [menuVisible, setMenuVisible] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const textArea = useRef();
  const [commentData, setCommentData] = useState(comment);
  const [deleteComment, setDeleteComment] = useState(false);
  const imageFile = useRef();
  const imageUrl = useRef();

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

  useEffect(() => {
    if (commentData.author._id === user._id) {
      if (user.profile_picture.slice(0, 4) !== 'http') {
        fetchImage(user, setImage);
      } else if (image) {
        setImage();
        const clone = structuredClone(commentData);
        clone.author = user;
        setCommentData(clone);
      }
    } else if (commentData.author.profile_picture.slice(0, 4) !== 'http') {
      fetchImage(commentData.author, setImage);
    }
  }, [commentData.author, user]);

  useEffect(() => {
    if ('image' in commentData) {
      if (
        commentData.image.slice(0, 4) !== 'http' &&
        commentData.image.slice(0, 4) !== 'blob'
      ) {
        fetchCommentImage(commentData, setCommentData);
      }
    }
  }, [commentData]);

  return (
    <div
      className={`bg-neutral-900 bg-opacity-20 dark:bg-neutral-50 dark:bg-opacity-20 border-l-4 ${
        user._id === comment.author._id
          ? 'border-l-yellow-500 dark:border-l-yellow-500'
          : 'border-l-blue-500 dark:border-l-blue-500'
      } pl-4 p-2 border-b-2 border-neutral-900  dark:border-neutral-400`}
    >
      <div className="flex justify-between relative">
        <div className="flex items-end gap-2 border-b-2 border-neutral-900 dark:border-neutral-400 pb-2 max-w-full">
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
                className="rounded-full w-10 h-10 border-2 border-neutral-900 dark:border-neutral-400 hover:opacity-70"
              ></img>
            ) : (
              <img
                alt=""
                src={comment.author.profile_picture}
                className="rounded-full w-10 h-10 border-2 border-neutral-900 dark:border-neutral-400 hover:opacity-70"
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
            className="font-mono overflow-clip text-ellipsis hover:underline"
          >
            {comment.author._id === user._id
              ? user.username
              : comment.author.username}
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
            setDeleteComment={setDeleteComment}
          />
        ) : null}
      </div>
      <div className="pt-2">
        {editComment ? (
          <div>
            <textarea
              ref={textArea}
              onClick={(event) => {
                event.preventDefault();
              }}
              className="w-full bg-transparent border-b-2 border-b-green-600 resize-none h-20 outline-offset-4"
              defaultValue={commentData.comment_text}
            ></textarea>
            {commentData.image ? (
              <div className="p-2 flex justify-center bg-black/10 dark:bg-white/10 rounded-2xl my-2">
                <img
                  src={commentData.image}
                  alt=""
                  className="border-2 border-neutral-100/70 rounded-md max-h-[500px] max-w-full"
                ></img>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <p>{commentData.comment_text}</p>
            {commentData.image ? (
              <div className="p-2 flex justify-center bg-black/10 dark:bg-white/10 rounded-2xl my-2">
                <img
                  src={commentData.image}
                  alt=""
                  className="border-2 border-neutral-100/70 rounded-md max-h-[500px] max-w-full"
                ></img>
              </div>
            ) : null}
          </div>
        )}
      </div>
      {editComment ? (
        <div>
          <ImageInput imageFile={imageFile} imageUrl={imageUrl} />
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
                if (textArea.current.value === '') {
                  setDeleteComment(true);
                  return;
                }
                const updatedcommentData = await fetchPutComment(
                  commentData._id,
                  textArea.current.value,
                  imageFile.current.files[0] || imageUrl.current.value,
                );
                setCommentData(updatedcommentData.comment.comment);
                setEditComment(false);
              }}
              className="border-b-2 border-green-500 px-4 py-1 rounded-md"
            >
              Save
            </button>
          </div>
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
                ? 'fill-red-500 text-red-500'
                : 'fill-neutral-900 text-neutral-900 dark:fill-neutral-400 dark:text-neutral-400'
            }`}
          >
            {icons.like}
            {`${likeCount}`}
          </button>
        </div>
      )}
      {deleteComment ? (
        <DeleteComment
          setDeleteComment={setDeleteComment}
          commentId={comment._id}
          setPostInformation={setPostInformation}
          setUserPosts={setUserPosts}
        />
      ) : null}
    </div>
  );
}
