import { useEffect, useState } from 'react';
import { fetchDeletePost } from '../fetch_requests/post.fetch';

export default function DeletePost({
  setDeletePost,
  postId,
  setTimeline,
  setUserPosts,
  setDeletingPost,
}) {
  const [mobile, setMobile] = useState(false);

  function screenWidth(event) {
    if (event.target.innerWidth > 768) setMobile(false);
    if (event.target.innerWidth <= 768) setMobile(true);
  }

  useEffect(() => {
    if (window.innerWidth > 768) setMobile(false);
    if (window.innerWidth <= 768) setMobile(true);
    window.addEventListener('resize', screenWidth);
  });

  return (
    <div
      onClick={(event) => {
        event.preventDefault();
      }}
      className={`fixed top-0 min-h-screen-nav w-full backdrop-brightness-50 backdrop-blur-sm text-neutral-200 z-40 max-w-[496px] ${
        mobile ? null : 'h-screen'
      }`}
    >
      <div className=" grid fixed inset-0 mx-auto h-fit top-1/2 bg-zinc-200 w-fit px-6 py-3 text-zinc-900 rounded-md backdrop-brightness-50 backdrop-blur-sm">
        Proceed with Deletion
        <div className=" grid grid-cols-2 py-1">
          <button
            onClick={() => {
              setDeletePost(false);
            }}
            className=" hover:bg-green-500 w-full h-full"
          >
            NO
          </button>
          <button
            onClick={async () => {
              setDeletingPost(true);
              setDeletePost(false);
              const posts = await fetchDeletePost(postId);
              if (setTimeline) setTimeline(posts.post);
              if (setUserPosts) setUserPosts(posts.post);
            }}
            className=" hover:bg-red-500 w-full h-full"
          >
            YES
          </button>
        </div>
      </div>
    </div>
  );
}
