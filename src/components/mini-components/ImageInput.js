import Icons from '../Icons';

export default function ImageInput({ imageFile, imageUrl }) {
  const icons = Icons();
  return (
    <div
      onClick={(event) => event.stopPropagation()}
      className="flex gap-1 text-blue-300 fill-blue-200"
    >
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
          onClick={(event) => event.preventDefault()}
          ref={imageUrl}
          id="url"
          className="bg-blue-300/30 rounded-lg"
        ></input>
      </label>
    </div>
  );
}
