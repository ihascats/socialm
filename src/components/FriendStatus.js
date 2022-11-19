import { useParams } from 'react-router-dom';
import Icons from './Icons';
import AcceptDeclineFrButtons from './mini-components/buttons/AcceptDeclineFrButtons';
import RemoveFriendButton from './mini-components/buttons/RemoveFriendButton';
import SendFrButton from './mini-components/buttons/SendFrButton';

export default function FriendStatus({
  userInformation,
  signedUserInfo,
  setSignedUserInfo,
  updateOutgoing,
}) {
  const icons = Icons();
  let signId;

  if (signedUserInfo) signId = signedUserInfo._id || null;

  if ('friend_requests' in userInformation) {
    if (typeof userInformation.friend_requests[0] === 'string') {
      if (userInformation.friend_requests.includes(signId))
        return <div>{icons.friendRequestPending}</div>;
    } else {
      if (
        userInformation.friend_requests.some(
          (friend_request) => friend_request._id === signId,
        )
      ) {
        return <div>{icons.friendRequestPending}</div>;
      }
    }
  }

  if ('friends_list' in signedUserInfo) {
    if (signedUserInfo.friends_list.includes(userInformation._id))
      return (
        <RemoveFriendButton
          setSignedUserInfo={setSignedUserInfo}
          id={userInformation._id}
        />
      );
  }

  if (signedUserInfo.friend_requests.includes(userInformation._id))
    return (
      <AcceptDeclineFrButtons
        setSignedUserInfo={setSignedUserInfo}
        id={userInformation._id}
      />
    );

  return (
    <SendFrButton
      setSignedUserInfo={setSignedUserInfo}
      id={userInformation._id}
      updateOutgoing={updateOutgoing}
    />
  );
}
