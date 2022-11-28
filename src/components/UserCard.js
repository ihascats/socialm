import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchImage } from '../fetch_requests/img.fetch';
import FriendStatus from './FriendStatus';

export default function UserCard({
  user,
  signedUserInfo,
  setSignedUserInfo,
  updateOutgoing,
  updateIncoming,
}) {
  const [userInfo, setUserInfo] = useState(user);
  useEffect(() => {
    if (userInfo.profile_picture.slice(0, 4) !== 'http') {
      fetchImage(userInfo, setUserInfo);
    }
  }, []);

  return (
    <li>
      <div className="flex items-end gap-2 border-b-2 border-neutral-900 p-2 max-w-full">
        <Link to={`/user/${userInfo._id}`}>
          {userInfo ? (
            <img
              alt=""
              src={userInfo.profile_picture}
              className="rounded-full w-10 h-10 border-2 border-neutral-900 hover:opacity-70"
            ></img>
          ) : (
            <img
              alt=""
              src={userInfo.profile_picture}
              className="rounded-full w-10 h-10 border-2 border-neutral-900 hover:opacity-70"
            ></img>
          )}
        </Link>
        <Link
          to={`/user/${userInfo._id}`}
          className="font-mono overflow-clip text-ellipsis hover:underline"
        >
          {userInfo.username}
        </Link>
        {signedUserInfo && userInfo ? (
          signedUserInfo._id ? (
            userInfo._id !== signedUserInfo._id ? (
              <FriendStatus
                userInformation={userInfo}
                signedUserInfo={signedUserInfo}
                setSignedUserInfo={setSignedUserInfo}
                updateOutgoing={updateOutgoing}
                updateIncoming={updateIncoming}
              />
            ) : null
          ) : null
        ) : null}
      </div>
    </li>
  );
}
