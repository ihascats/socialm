import { fetchPostPost } from '../../../fetch_requests/post.fetch';

export default function NewPostButtons({
  setNewPostVisible,
  setTimeline,
  textArea,
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
          const posts = await fetchPostPost(textArea.current.value);
          setTimeline(posts.post.posts);
        }}
        className="border-b-2 border-green-500 px-4 py-1"
      >
        Send
      </button>
    </div>
  );
}
