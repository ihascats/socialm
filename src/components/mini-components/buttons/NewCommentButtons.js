import { fetchPostComment } from '../../../fetch_requests/post.fetch';

export default function NewCommentButtons({
  setNewCommentVisible,
  postId,
  textArea,
  setRepliesCount,
  setPostInformation,
}) {
  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={(event) => {
          event.preventDefault();
          setNewCommentVisible(false);
        }}
        className="border-b-2 border-red-500 px-4 py-1"
      >
        Cancel
      </button>
      <button
        onClick={async (event) => {
          event.preventDefault();
          setNewCommentVisible(false);
          const posts = await fetchPostComment(textArea.current.value, postId);
          if (setRepliesCount) setRepliesCount(posts.post.replies.length);
          if (setPostInformation) setPostInformation(posts.post);
        }}
        className="border-b-2 border-green-500 px-4 py-1"
      >
        Send
      </button>
    </div>
  );
}
