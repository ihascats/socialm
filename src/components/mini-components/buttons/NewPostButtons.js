import { fetchPostPost } from '../../../fetch_requests/post.fetch';

export default function NewPostButtons({
  setNewPostVisible,
  setTimeline,
  textArea,
  setUserPosts,
  imageFile,
  imageUrl,
}) {
  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={(event) => {
          event.preventDefault();
          setNewPostVisible(false);
        }}
        className="border-b-2 border-red-500 px-4 py-1"
      >
        Cancel
      </button>
      <button
        onClick={async (event) => {
          event.preventDefault();
          setNewPostVisible(false);
          const posts = await fetchPostPost(
            textArea.current.value,
            imageFile.current.files[0] || imageUrl.current.value,
          );

          if (setTimeline) setTimeline(posts.post.posts);
          if (setUserPosts) setUserPosts(posts.post);
        }}
        className="border-b-2 border-green-500 px-4 py-1"
      >
        Send
      </button>
    </div>
  );
}
