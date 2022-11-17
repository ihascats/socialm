import { useRef } from 'react';
import { fetchPostPost } from '../fetch_requests/post.fetch';

export default function NewPost({ setNewPostVisible }) {
  const textArea = useRef();

  return (
    <div className="fixed top-0 min-h-screen-nav w-full backdrop-brightness-50 backdrop-blur-sm text-neutral-200">
      <div className="p-4">
        <textarea
          ref={textArea}
          onClick={(event) => {
            event.preventDefault();
          }}
          placeholder="What's happening?"
          className="w-full bg-transparent border-b-2 border-l-2 border-blue-600 resize-none h-20 outline-offset-4 p-2"
        ></textarea>
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
              const post = await fetchPostPost(textArea.current.value);
            }}
            className="border-b-2 border-green-500 px-4 py-1"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
