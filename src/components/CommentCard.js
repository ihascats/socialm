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
    return true;
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

  const [updating, setUpdating] = useState(false);

  const [updatingComment, setUpdatingComment] = useState(false);

  const [deletingComment, setDeletingComment] = useState(false);

  return (
    <div
      className={`bg-neutral-900/20 dark:bg-neutral-50/20 border-l-4 ${
        user._id === comment.author._id
          ? 'border-l-yellow-500 dark:border-l-yellow-500'
          : 'border-l-blue-500 dark:border-l-blue-500'
      } pl-4 p-2 border-b-2 border-neutral-900  dark:border-neutral-400`}
    >
      <div className="flex justify-between relative">
        <div className="flex items-end gap-2 border-b-2 border-neutral-900 dark:border-neutral-400 pb-2 max-w-full whitespace-nowrap">
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
              {`${new Date(comment.createdAt)
                .toString()
                .split(' ')[1]
                .trim()} ${new Date(comment.createdAt)
                .toString()
                .split(' ')[2]
                .trim()}`}
            </h2>
          ) : Math.floor(
              Math.floor(
                Math.abs((Date.parse(comment.createdAt) - Date.now()) / 600) /
                  60,
              ) / 60,
            ) > 0 ? (
            <h2 className="text-sm font-bold opacity-60 font-mono whitespace-nowrap">
              {`${Math.floor(
                Math.floor(
                  Math.abs((Date.parse(comment.createdAt) - Date.now()) / 600) /
                    60,
                ) / 60,
              )}h`}
            </h2>
          ) : Math.floor(
              Math.abs((Date.parse(comment.createdAt) - Date.now()) / 600) / 60,
            ) > 0 ? (
            <h2 className="text-sm font-bold opacity-60 font-mono whitespace-nowrap">
              {`${Math.floor(
                Math.abs((Date.parse(comment.createdAt) - Date.now()) / 600) /
                  60,
              )}m`}
            </h2>
          ) : (
            <h2 className="text-sm font-bold opacity-60 font-mono whitespace-nowrap">
              {`${Math.floor(
                Math.abs((Date.parse(comment.createdAt) - Date.now()) / 600),
              )}s`}
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
          deletingComment ? (
            <div className="flex flex-col font-mono items-center justify-center dark:fill-neutral-50">
              {icons.loading}
              Deleting Comment..
            </div>
          ) : updatingComment ? (
            <div className="flex flex-col font-mono items-center justify-center dark:fill-neutral-50">
              {icons.loading}
              Updating Comment Information..
            </div>
          ) : (
            <div>
              <textarea
                ref={textArea}
                onClick={(event) => {
                  event.preventDefault();
                }}
                className="my-2 w-full bg-transparent border-b-2 border-b-green-600 resize-none h-20 outline-offset-4"
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
          )
        ) : deletingComment ? (
          <div className="flex flex-col font-mono items-center justify-center dark:fill-neutral-50">
            {icons.loading}
            Deleting Comment..
          </div>
        ) : (
          <div>
            <p className="my-2">{commentData.comment_text}</p>
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
        deletingComment ? null : updatingComment ? null : (
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
                  setUpdatingComment(true);
                  const updatedcommentData = await fetchPutComment(
                    commentData._id,
                    textArea.current.value,
                    imageFile.current.files[0] || imageUrl.current.value,
                  );
                  setCommentData(updatedcommentData.comment.comment);
                  setUpdatingComment(false);
                  setEditComment(false);
                }}
                className="border-b-2 border-green-500 px-4 py-1 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="flex justify-end gap-6">
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
      )}
      {deleteComment ? (
        <DeleteComment
          setDeleteComment={setDeleteComment}
          commentId={comment._id}
          setPostInformation={setPostInformation}
          setUserPosts={setUserPosts}
          setDeletingComment={setDeletingComment}
        />
      ) : null}
    </div>
  );
}
