import { useState } from 'react';
import { fetchPostComment } from '../../../fetch_requests/post.fetch';

export default function NewCommentButtons({
  setNewCommentVisible,
  postId,
  textArea,
  setRepliesCount,
  setPostInformation,
  imageFile,
  imageUrl,
  newCommentUpload,
}) {
  const [emptyField, setEmptyField] = useState(false);

  return (
    <div>
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
            if (textArea.current.value === '') {
              setEmptyField(true);
              textArea.current.oninput = () => {
                setEmptyField(false);
                textArea.oninput = null;
              };
              return;
            }
            if (newCommentUpload) {
              newCommentUpload(true);
            }
            setNewCommentVisible(false);
            const posts = await fetchPostComment(
              textArea.current.value,
              postId,
              imageFile.current.files[0] || imageUrl.current.value,
            );
            if (setRepliesCount) setRepliesCount(posts.post.replies.length);
            if (setPostInformation) {
              setPostInformation(posts.post);
              if (newCommentUpload) {
                newCommentUpload(false);
              }
            }
          }}
          className="border-b-2 border-green-500 px-4 py-1"
        >
          Send
        </button>
      </div>
      {emptyField ? (
        <div className="absolute mt-10 text-red-500 border-2 border-red-500 -mx-4 py-2 px-10 rounded-md text-center w-full bg-black/50">
          Text field can't be empty!
        </div>
      ) : null}
    </div>
  );
}
