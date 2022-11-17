import { useParams } from 'react-router-dom';
import { fetchPutRemoveFr } from '../fetch_requests/user.fetch';
import Icons from './Icons';
import AcceptDeclineFrButtons from './mini-components/buttons/AcceptDeclineFrButtons';
import RemoveFriendButton from './mini-components/buttons/RemoveFriendButton';
import SendFrButton from './mini-components/buttons/SendFrButton';

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
        <AcceptDeclineFrButtons setSignedUserInfo={setSignedUserInfo} id={id} />
      );

    if (signedUserInfo.friends_list.includes(userInformation._id))
      return (
        <RemoveFriendButton setSignedUserInfo={setSignedUserInfo} id={id} />
      );

    return <SendFrButton setSignedUserInfo={setSignedUserInfo} id={id} />;
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
