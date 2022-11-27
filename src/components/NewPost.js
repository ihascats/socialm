import { useRef } from 'react';
import NewPostButtons from './mini-components/buttons/NewPostButtons';
import ImageInput from './mini-components/ImageInput';

export default function NewPost({
  setNewPostVisible,
  setTimeline,
  setUserPosts,
}) {
  const textArea = useRef();
  const imageFile = useRef();
  const imageUrl = useRef();

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
        <ImageInput imageFile={imageFile} imageUrl={imageUrl} />
        <NewPostButtons
          setNewPostVisible={setNewPostVisible}
          setTimeline={setTimeline}
          setUserPosts={setUserPosts}
          textArea={textArea}
          imageFile={imageFile}
          imageUrl={imageUrl}
        />
      </div>
    </div>
  );
}
