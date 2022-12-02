import { useRef } from 'react';
import NewCommentButtons from './mini-components/buttons/NewCommentButtons';
import ImageInput from './mini-components/ImageInput';

export default function NewComment({
  setNewCommentVisible,
  setRepliesCount,
  postId,
  setPostInformation,
  showDescription,
}) {
  const textArea = useRef();
  const imageFile = useRef();
  const imageUrl = useRef();

  return (
    <div
      className={`z-50 fixed top-0 min-h-screen-nav w-full max-w-[500px] backdrop-brightness-50 backdrop-blur-sm text-neutral-200 ${
        showDescription ? 'z-50 h-full ml-44' : null
      }`}
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
        />
      </div>
    </div>
  );
}
