import { useRef } from 'react';
import NewCommentButtons from './mini-components/buttons/NewCommentButtons';

export default function NewComment({
  setNewCommentVisible,
  setRepliesCount,
  postId,
  setPostInformation,
}) {
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
        <NewCommentButtons
          setNewCommentVisible={setNewCommentVisible}
          postId={postId}
          textArea={textArea}
          setRepliesCount={setRepliesCount}
          setPostInformation={setPostInformation}
        />
      </div>
    </div>
  );
}
