import { useState } from 'react';
import FriendStatus from './FriendStatus';
import UpdateUserInfoForm from './mini-components/forms/UpdateUserInfoForm';

export default function UserHeader({
  userInformation,
  signedUserInfo,
  setSignedUserInfo,
}) {
  const [editUser, setEditUser] = useState(false);

  return (
    <div className="flex p-2 items-end w-full max-w-[100vw]">
      <div
        onClick={() => {
          setEditUser(true);
        }}
        className="flex gap-2 items-end w-3/4"
      >
        <img
          alt=""
          src={userInformation.profile_picture}
          className="min-w-fit object-center object-cover w-16 h-16 rounded-full border-2 border-neutral-900"
        ></img>
        <h1 className="font-mono font-bold text-2xl overflow-clip text-ellipsis">
          {userInformation.username}
        </h1>
      </div>
      {signedUserInfo && userInformation ? (
        signedUserInfo._id ? (
          userInformation._id !== signedUserInfo._id ? (
            <FriendStatus
              userInformation={userInformation}
              signedUserInfo={signedUserInfo}
              setSignedUserInfo={setSignedUserInfo}
            />
          ) : null
        ) : null
      ) : null}
      {editUser ? (
        <UpdateUserInfoForm
          signedUserInfo={signedUserInfo}
          setEditUser={setEditUser}
          setSignedUserInfo={setSignedUserInfo}
        />
      ) : null}
    </div>
  );
}
