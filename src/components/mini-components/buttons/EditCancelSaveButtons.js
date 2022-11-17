import { fetchPutPost } from '../../../fetch_requests/post.fetch';

export default function EditCancelSaveButtons({
  setEditPost,
  setPostData,
  textArea,
  postData,
}) {
  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={(event) => {
          event.preventDefault();
          setEditPost(false);
        }}
        className="border-b-2 border-red-500 px-4 py-1 rounded-md"
      >
        Cancel
      </button>
      <button
        onClick={async (event) => {
          event.preventDefault();
          const updatedPostData = await fetchPutPost(
            postData._id,
            textArea.current.value,
          );
          setPostData(updatedPostData.post.post);
          setEditPost(false);
        }}
        className="border-b-2 border-green-500 px-4 py-1 rounded-md"
      >
        Save
      </button>
    </div>
  );
}
