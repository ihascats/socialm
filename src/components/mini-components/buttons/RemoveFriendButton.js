import { fetchPutRemoveFr } from '../../../fetch_requests/user.fetch';

export default function RemoveFriendButton({ setSignedUserInfo, id }) {
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
}
