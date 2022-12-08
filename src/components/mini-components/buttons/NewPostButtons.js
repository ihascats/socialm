import { useState } from 'react';
import { fetchPostPost } from '../../../fetch_requests/post.fetch';

export default function NewPostButtons({
  setNewPostVisible,
  setTimeline,
  textArea,
  setUserPosts,
  imageFile,
  imageUrl,
  newUpload,
}) {
  const [emptyField, setEmptyField] = useState(false);

  return (
    <div>
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
            if (textArea.current.value === '') {
              setEmptyField(true);
              textArea.current.oninput = () => {
                setEmptyField(false);
                textArea.oninput = null;
              };
              return;
            }

            // Check for newUpload flag and update it
            if (newUpload) {
              newUpload(true);
            }

            // Hide the new post form
            setNewPostVisible(false);

            // Fetch new post and update posts in timeline and user posts
            const posts = await fetchPostPost(
              textArea.current.value,
              imageFile.current.files[0] || imageUrl.current.value,
            );
            if (setTimeline) {
              setTimeline(posts.post.posts);
            }
            if (setUserPosts) {
              setUserPosts(posts.post);
            }

            // Update newUpload flag
            if (newUpload) {
              newUpload(false);
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
