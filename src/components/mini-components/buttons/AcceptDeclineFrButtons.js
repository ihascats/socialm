import {
  fetchPutAcceptFr,
  fetchPutDeclineFr,
} from '../../../fetch_requests/user.fetch';
import Icons from '../../Icons';

export default function AcceptDeclineFrButtons({
  setSignedUserInfo,
  id,
  updateIncoming,
}) {
  const icons = Icons();

  return (
    <div className="flex gap-3">
      <button
        onClick={async () => {
          const userInfo = await fetchPutAcceptFr(id);
          setSignedUserInfo(userInfo.user);
          if (updateIncoming) updateIncoming();
        }}
        className="fill-blue-500"
      >
        {icons.acceptFriendRequest}
      </button>
      <button
        onClick={async () => {
          const userInfo = await fetchPutDeclineFr(id);
          setSignedUserInfo(userInfo.user);
          if (updateIncoming) updateIncoming();
        }}
        className="fill-red-500"
      >
        {icons.declineFriendRequest}
      </button>
    </div>
  );
}
