import { useEffect, useRef, useState } from 'react';
import NewCommentButtons from './mini-components/buttons/NewCommentButtons';
import ImageInput from './mini-components/ImageInput';

export default function NewComment({
  setNewCommentVisible,
  setRepliesCount,
  postId,
  setPostInformation,
  showDescription,
  newCommentUpload,
}) {
  const textArea = useRef();
  const imageFile = useRef();
  const imageUrl = useRef();

  useEffect(() => {
    const prevWidth = window.innerWidth;
    window.addEventListener('resize', function (event) {
      const currentWidth = window.innerWidth;
      if (prevWidth !== currentWidth) {
        setNewCommentVisible(false);
      }
    });
  });

  const [mobile, setMobile] = useState(false);

  function screenWidth(event) {
    setMobile(event.target.innerWidth <= 768);
  }

  useEffect(() => {
    setMobile(window.innerWidth <= 768);
    window.addEventListener('resize', screenWidth);
  }, []);

  return (
    <div
      className={`z-50 fixed top-0 min-h-screen-nav w-full max-w-[498px] backdrop-brightness-50 backdrop-blur-sm text-neutral-200 ${
        showDescription || !mobile ? 'z-50 h-screen' : null
      } ${showDescription === false ? 'h-screen' : null}`}
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
        <NewCommentButtons
          setNewCommentVisible={setNewCommentVisible}
          postId={postId}
          textArea={textArea}
          setRepliesCount={setRepliesCount}
          setPostInformation={setPostInformation}
          imageFile={imageFile}
          imageUrl={imageUrl}
          newCommentUpload={newCommentUpload}
        />
      </div>
    </div>
  );
}
