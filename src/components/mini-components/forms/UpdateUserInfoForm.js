import { useRef } from 'react';
import { fetchPutUserInfo } from '../../../fetch_requests/user.fetch';

export default function UpdateUserInfoForm({
  signedUserInfo,
  setEditUser,
  setSignedUserInfo,
}) {
  const image = useRef();
  const url = useRef();
  const username = useRef();
  return (
    <form className="min-h-screen-nav w-full bg-blue-300/70 backdrop-blur-md fixed top-0 left-0 z-40 p-6 flex flex-col justify-center items-center gap-2">
      <label htmlFor="url" className="font-mono grid">
        image url:
        <input
          id="url"
          ref={url}
          className="bg-neutral-900/50 border-b-orange-400 border-b-4 text-white p-1"
        ></input>
      </label>
      <p className="font-mono">or</p>
      <label
        htmlFor="file"
        className="bg-neutral-900/50 border-b-orange-400 border-b-4 px-4 text-white p-1 hover:opacity-90 font-mono"
      >
        upload new image
        <input ref={image} id="file" type="file" hidden></input>
      </label>
      <label htmlFor="url" className="font-mono grid">
        username:
        <input
          id="url"
          ref={username}
          defaultValue={signedUserInfo.username}
          className="bg-neutral-900/50 border-b-yellow-400 border-b-4 text-white p-1"
        ></input>
      </label>
      <div className="flex gap-1">
        <button
          onClick={(event) => {
            event.preventDefault();
            setEditUser(false);
          }}
          className="font-mono bg-neutral-900/30 hover:bg-neutral-900/20 py-2 px-6"
        >
          Cancel
        </button>
        <button
          onClick={async (event) => {
            event.preventDefault();
            const newUsername = username.current.value;
            const profile_picture =
              url.current.value.slice(0, 4) === 'http'
                ? url.current.value
                : image.current.files[0];
            let userInfo;
            if (newUsername) {
              userInfo = await fetchPutUserInfo(newUsername, profile_picture);
            }
            setSignedUserInfo(userInfo.user.user);
            setEditUser(false);
          }}
          className="font-mono bg-neutral-900/30 hover:bg-neutral-900/20 py-2 px-6"
        >
          Update
        </button>
      </div>
    </form>
  );
}
