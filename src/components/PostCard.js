import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchImage, fetchPostImage } from '../fetch_requests/img.fetch';
import { fetchPutLike } from '../fetch_requests/post.fetch';
import DeletePost from './DeletePost';
import Icons from './Icons';
import CommentLikeButtons from './mini-components/buttons/CommentLikeButtons';
import EditCancelSaveButtons from './mini-components/buttons/EditCancelSaveButtons';
import MoreOptionsButton from './mini-components/buttons/MoreOptionsButton';
import ImageInput from './mini-components/ImageInput';
import Timestamp from './mini-components/Timestamp';
import MoreOptionsMenu from './MoreOptionsMenu';
import NewComment from './NewComment';

export default function PostCard({
  post,
  user,
  setTimeline,
  setUserPosts,
  setPostInformation,
  postInformation,
  newCommentUpload,
}) {
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [image, setImage] = useState();
  const [menuVisible, setMenuVisible] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const textArea = useRef();
  const [postData, setPostData] = useState(post);
  const [deletePost, setDeletePost] = useState(false);
  const [newCommentVisible, setNewCommentVisible] = useState(false);
  const [repliesCount, setRepliesCount] = useState(post.replies.length);
  const imageFile = useRef();
  const imageUrl = useRef();

  async function like() {
    const json = await fetchPutLike(post);
    setLikeCount(json.likeCount);
    setLiked((prevState) => !prevState);
    return true;
  }

  useEffect(() => {
    if (postData.author._id === user._id) {
      if (user.profile_picture.slice(0, 4) !== 'http') {
        fetchImage(user, setImage);
      } else if (image) {
        setImage();
        const clone = structuredClone(postData);
        clone.author = user;
        setPostData(clone);
      }
    } else if (postData.author.profile_picture.slice(0, 4) !== 'http') {
      fetchImage(postData.author, setImage);
    }
  }, [postData.author, user]);

  useEffect(() => {
    if ('image' in postData) {
      if (
        postData.image.slice(0, 4) !== 'http' &&
        postData.image.slice(0, 4) !== 'blob'
      ) {
        fetchPostImage(postData, setPostData);
      }
    }
  }, [postData]);

  useEffect(() => {
    if (postInformation)
      if (postInformation.replies.length !== repliesCount) {
        setRepliesCount(postInformation.replies.length);
      }
  }, [postInformation]);

  const [updating, setUpdating] = useState(false);
  const [deletingPost, setDeletingPost] = useState(false);
  const icons = Icons();

  return (
    <Link draggable={false} to={`/post/${postData._id}`}>
      <div className="p-2 border-b-2 border-neutral-900 dark:border-neutral-400 max-w-[100vw]">
        <div className="flex justify-between relative w-full">
          <div className="flex items-end gap-2 border-b-2 border-neutral-900 dark:border-neutral-400 pb-2 max-w-full whitespace-nowrap">
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
                  className="rounded-full w-10 h-10 border-2 border-neutral-900 dark:border-neutral-400 hover:opacity-70"
                ></img>
              ) : (
                <img
                  alt=""
                  src={postData.author.profile_picture}
                  className="rounded-full w-10 h-10 border-2 border-neutral-900 dark:border-neutral-400 hover:opacity-70"
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
              className="font-mono overflow-clip text-ellipsis hover:underline max-w-[160px]"
            >
              {postData.author._id === user._id
                ? user.username
                : postData.author.username}
            </Link>
            <Timestamp createdAt={postData.createdAt} />
          </div>
          {user._id === postData.author._id ? (
            <MoreOptionsButton setMenuVisible={setMenuVisible} />
          ) : null}

          {menuVisible ? (
            <MoreOptionsMenu
              setMenuVisible={setMenuVisible}
              setEditPost={setEditPost}
              setDeletePost={setDeletePost}
            />
          ) : null}
        </div>

        <div className="pt-2">
          {editPost ? (
            deletingPost ? (
              <div className="flex flex-col font-mono items-center justify-center dark:fill-neutral-50">
                {icons.loading}
                Deleting Post..
              </div>
            ) : updating ? (
              <div className="flex flex-col font-mono items-center justify-center dark:fill-neutral-50">
                {icons.loading}
                Updating Post Information..
              </div>
            ) : (
              <div>
                <textarea
                  ref={textArea}
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                  className="my-2 w-full bg-transparent border-b-2 border-b-green-600 resize-none h-20 outline-offset-4"
                  defaultValue={postData.post_text}
                ></textarea>
                {postData.image ? (
                  <div className="p-2 flex justify-center bg-black/10 dark:bg-white/10 rounded-2xl my-2">
                    <img
                      src={postData.image}
                      alt=""
                      className="border-2 border-neutral-100/70 rounded-md max-h-[500px] max-w-full"
                    ></img>
                  </div>
                ) : null}
              </div>
            )
          ) : deletingPost ? (
            <div className="flex flex-col font-mono items-center justify-center dark:fill-neutral-50">
              {icons.loading}
              Deleting Post..
            </div>
          ) : (
            <div>
              <p className="my-2">{postData.post_text}</p>
              {postData.image ? (
                <div className="p-2 flex justify-center bg-black/10 dark:bg-white/10 rounded-2xl my-2">
                  <img
                    src={postData.image}
                    alt=""
                    className="border-2 border-neutral-100/70 rounded-md max-h-[500px] max-w-full"
                  ></img>
                </div>
              ) : null}
            </div>
          )}
        </div>
        {editPost ? (
          deletingPost ? null : updating ? null : (
            <div>
              <ImageInput imageFile={imageFile} imageUrl={imageUrl} />
              <EditCancelSaveButtons
                setEditPost={setEditPost}
                setPostData={setPostData}
                textArea={textArea}
                postData={postData}
                imageFile={imageFile}
                imageUrl={imageUrl}
                setDeletePost={setDeletePost}
                setUpdating={setUpdating}
              />
            </div>
          )
        ) : (
          <CommentLikeButtons
            like={like}
            liked={liked}
            likeCount={likeCount}
            repliesCount={repliesCount}
            setNewCommentVisible={setNewCommentVisible}
          />
        )}
      </div>
      {deletePost ? (
        <DeletePost
          setDeletePost={setDeletePost}
          postId={postData._id}
          setTimeline={setTimeline}
          setUserPosts={setUserPosts}
          setDeletingPost={setDeletingPost}
        />
      ) : null}
      {newCommentVisible ? (
        <NewComment
          setNewCommentVisible={setNewCommentVisible}
          postId={postData._id}
          setTimeline={setTimeline}
          setUserPosts={setUserPosts}
          setRepliesCount={setRepliesCount}
          setPostInformation={setPostInformation}
          newCommentUpload={newCommentUpload}
        />
      ) : null}
    </Link>
  );
}
