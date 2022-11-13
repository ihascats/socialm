import { useParams } from 'react-router-dom';
import {
  fetchPutAcceptFr,
  fetchPutDeclineFr,
  fetchPutFriendRequest,
  fetchPutRemoveFr,
} from '../fetch_requests';
import Icons from './Icons';

export default function UserHeader({
  userInformation,
  signedUserInfo,
  setSignedUserInfo,
}) {
  const { id } = useParams();
  let signId;
  if (signedUserInfo) signId = signedUserInfo._id || null;

  function friendStatus() {
    if (userInformation.friend_requests.includes(signId))
      return <div>{icons.friendRequestPending}</div>;
    if (signedUserInfo.friend_requests.includes(userInformation._id))
      return (
        <div className="flex gap-3">
          <button
            onClick={async () => {
              const userInfo = await fetchPutAcceptFr(id);
              setSignedUserInfo(userInfo.user);
            }}
            className="fill-blue-500"
          >
            {icons.acceptFriendRequest}
          </button>
          <button
            onClick={async () => {
              const userInfo = await fetchPutDeclineFr(id);
              setSignedUserInfo(userInfo.user);
            }}
            className="fill-red-500"
          >
            {icons.declineFriendRequest}
          </button>
        </div>
      );
    if (signedUserInfo.friends_list.includes(userInformation._id))
      return (
        <button
          onClick={async () => {
            const userInfo = await fetchPutRemoveFr(id);
            setSignedUserInfo(userInfo.user);
          }}
        >
          Friends
        </button>
      );
    return (
      <button
        onClick={async () => {
          const userInfo = await fetchPutFriendRequest(id);
          if ('user' in userInfo) {
            setSignedUserInfo(userInfo.user);
          }
        }}
      >
        {icons.sendFriendRequest}
      </button>
    );
  }

  const icons = Icons();
  return (
    <div className="flex p-2 items-end w-full dark:bg-neutral-900 dark:text-neutral-50">
      <div className="flex gap-2 items-end w-3/4">
        <img
          alt=""
          src={userInformation.profile_picture}
          className="min-w-fit object-center object-cover w-16 h-16 rounded-full border-2 border-neutral-900 dark:border-lime-300"
        ></img>
        <h1 className="font-mono font-bold text-2xl overflow-clip text-ellipsis">
          {userInformation.username}
        </h1>
      </div>
      {signId ? (userInformation._id !== signId ? friendStatus() : null) : null}
    </div>
  );
}
