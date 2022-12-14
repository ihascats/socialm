import { useEffect, useRef } from 'react';
import NewPostButtons from './mini-components/buttons/NewPostButtons';
import ImageInput from './mini-components/ImageInput';

export default function NewPost({
  setNewPostVisible,
  setTimeline,
  setUserPosts,
  showDescription,
  newUpload,
}) {
  const textArea = useRef();
  const imageFile = useRef();
  const imageUrl = useRef();

  useEffect(() => {
    const prevWidth = window.innerWidth;
    window.addEventListener('resize', function (event) {
      const currentWidth = window.innerWidth;
      if (prevWidth !== currentWidth) {
        setNewPostVisible(false);
      }
    });
  });

  return (
    <div
      className={`fixed top-0 min-h-screen-nav w-full max-w-[500px] backdrop-brightness-50 backdrop-blur-sm text-neutral-200 z-[100] ${
        showDescription ? 'h-full' : null
      } ${showDescription === false ? 'h-full ml-20' : null}`}
    >
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
          newUpload={newUpload}
        />
      </div>
    </div>
  );
}
