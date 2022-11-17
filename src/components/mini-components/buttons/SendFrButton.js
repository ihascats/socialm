import { fetchPutFriendRequest } from '../../../fetch_requests/user.fetch';
import Icons from '../../Icons';

export default function SendFrButton({ setSignedUserInfo, id }) {
  const icons = Icons();

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
