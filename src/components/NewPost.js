import { useRef } from 'react';
import { fetchPostPost } from '../fetch_requests/post.fetch';
import NewPostButtons from './mini-components/buttons/NewPostButtons';

export default function NewPost({ setNewPostVisible, setTimeline }) {
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
        <NewPostButtons
          setNewPostVisible={setNewPostVisible}
          setTimeline={setTimeline}
          textArea={textArea}
        />
      </div>
    </div>
  );
}
