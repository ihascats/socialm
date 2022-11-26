import { useRef } from 'react';
import Icons from './Icons';
import NewPostButtons from './mini-components/buttons/NewPostButtons';

export default function NewPost({
  setNewPostVisible,
  setTimeline,
  setUserPosts,
}) {
  const textArea = useRef();
  const imageFile = useRef();
  const imageUrl = useRef();
  const icons = Icons();

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
        <div className="flex gap-1 text-blue-300 fill-blue-200">
          <button
            onClick={(event) => {
              event.preventDefault();
              imageFile.current.click();
            }}
            className="bg-orange-200/20 rounded-lg"
          >
            {icons.addImage}
          </button>
          <input ref={imageFile} type="file" hidden></input>
          <label htmlFor="url" className="flex gap-1 font-mono">
            url:
            <input
              ref={imageUrl}
              id="url"
              className="bg-blue-300/30 rounded-lg"
            ></input>
          </label>
        </div>
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
