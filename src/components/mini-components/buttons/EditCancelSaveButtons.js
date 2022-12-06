import { fetchPutPost } from '../../../fetch_requests/post.fetch';

export default function EditCancelSaveButtons({
  setEditPost,
  setPostData,
  textArea,
  postData,
  imageFile,
  imageUrl,
  setDeletePost,
  setUpdating,
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
          if (textArea.current.value === '') {
            setDeletePost(true);
            return;
          }
          if (setUpdating) {
            setUpdating(true);
          }
          const updatedPostData = await fetchPutPost(
            postData._id,
            textArea.current.value,
            imageFile.current.files[0] || imageUrl.current.value,
          );
          setPostData(updatedPostData.post.post);
          setUpdating(false);
          setEditPost(false);
        }}
        className="border-b-2 border-green-500 px-4 py-1 rounded-md"
      >
        Save
      </button>
    </div>
  );
}
