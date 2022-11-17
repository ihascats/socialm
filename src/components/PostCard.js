import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchImage } from '../fetch_requests/img.fetch';
import { fetchPutLike } from '../fetch_requests/post.fetch';
import DeletePost from './DeletePost';
import Icons from './Icons';
import CommentLikeButtons from './mini-components/buttons/CommentLikeButtons';
import EditCancelSaveButtons from './mini-components/buttons/EditCancelSaveButtons';
import MoreOptionsButton from './mini-components/buttons/MoreOptionsButton';
import MoreOptionsMenu from './MoreOptionsMenu';

export default function PostCard({ post, user, setTimeline }) {
  const icons = Icons();
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [image, setImage] = useState();
  const [menuVisible, setMenuVisible] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const textArea = useRef();
  const [postData, setPostData] = useState(post);
  const [deletePost, setDeletePost] = useState(false);

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
          <EditCancelSaveButtons
            setEditPost={setEditPost}
            setPostData={setPostData}
            textArea={textArea}
            postData={postData}
          />
        ) : (
          <CommentLikeButtons
            like={like}
            liked={liked}
            likeCount={likeCount}
            postData={postData}
          />
        )}
      </div>
      {deletePost ? (
        <DeletePost
          setDeletePost={setDeletePost}
          postId={postData._id}
          setTimeline={setTimeline}
        />
      ) : null}
    </Link>
  );
}
