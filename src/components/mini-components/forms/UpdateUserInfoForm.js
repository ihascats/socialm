import { useEffect, useRef, useState } from 'react';
import { fetchPutUserInfo } from '../../../fetch_requests/user.fetch';
import Icons from '../../Icons';

export default function UpdateUserInfoForm({
  signedUserInfo,
  setEditUser,
  setSignedUserInfo,
}) {
  const image = useRef();
  const url = useRef();
  const username = useRef();

  const [mobile, setMobile] = useState(false);

  function screenWidth(event) {
    setMobile(event.target.innerWidth <= 768);
  }

  useEffect(() => {
    setMobile(window.innerWidth <= 768);
    window.addEventListener('resize', screenWidth);
  }, []);

  const [nameLengthError, setNameLengthError] = useState(true);

  const [updating, setUpdating] = useState(false);
  const icons = Icons();

  return updating ? (
    <form
      className={`${
        mobile ? 'min-h-screen-nav' : 'min-h-screen'
      } w-full bg-blue-300/70 backdrop-blur-md fixed top-0 left-0 z-40 p-6 flex flex-col justify-center items-center gap-2`}
    >
      <div className="flex flex-col font-mono items-center justify-center dark:fill-neutral-50 w-full h-full">
        {icons.loading}
        Updating User Information..
        <p>(changes might take a moment to apply)</p>
      </div>
    </form>
  ) : (
    <form
      className={`${
        mobile ? 'min-h-screen-nav' : 'min-h-screen'
      } w-full bg-blue-300/70 backdrop-blur-md fixed top-0 left-0 z-40 p-6 flex flex-col justify-center items-center gap-2`}
    >
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
          onInput={(event) => {
            event.preventDefault();
            if (event.target.value.length > 2 && event.target.value.length < 20)
              setNameLengthError(false);
            if (event.target.value.length > 20) setNameLengthError(true);
          }}
          className="bg-neutral-900/50 border-b-yellow-400 border-b-4 text-white p-1"
        ></input>
      </label>
      {nameLengthError ? (
        <div className="font-mono text-red-500 py-2 px-4 bg-neutral-50/50 rounded-2xl border-2 border-red-500">
          <p>username must be at least 2 and at most 20 characters long</p>
        </div>
      ) : null}
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
            if (
              username.current.value.length < 2 ||
              username.current.value.length > 20
            ) {
              setNameLengthError(true);
              return;
            }
            const newUsername = username.current.value;
            const profile_picture =
              url.current.value.slice(0, 4) === 'http'
                ? url.current.value
                : image.current.files[0];
            let userInfo;
            if (newUsername) {
              setUpdating(true);
              userInfo = await fetchPutUserInfo(newUsername, profile_picture);
            }
            setSignedUserInfo(userInfo.user.user);
            setEditUser(false);
            setUpdating(false);
          }}
          className="font-mono bg-neutral-900/30 hover:bg-neutral-900/20 py-2 px-6"
        >
          Update
        </button>
      </div>
    </form>
  );
}
