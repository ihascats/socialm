import { fetchDeleteComment } from '../fetch_requests/post.fetch';

export default function DeleteComment({
  setDeleteComment,
  commentId,
  setPostInformation,
}) {
  return (
    <div
      onClick={(event) => {
        event.preventDefault();
      }}
      className="fixed top-0 left-0 min-h-screen-nav w-full backdrop-brightness-50 backdrop-blur-sm text-neutral-200 z-40"
    >
      <div className=" grid fixed inset-0 mx-auto h-fit top-1/2 bg-zinc-200 w-fit px-6 py-3 text-zinc-900 rounded-md backdrop-brightness-50 backdrop-blur-sm">
        Proceed with Deletion
        <div className=" grid grid-cols-2 py-1">
          <button
            onClick={() => {
              setDeleteComment(false);
            }}
            className=" hover:bg-green-500 w-full h-full"
          >
            NO
          </button>
          <button
            onClick={async () => {
              setDeleteComment(false);
              const posts = await fetchDeleteComment(commentId);
              setPostInformation(posts.post);
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
