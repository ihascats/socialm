import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import UserCard from './components/UserCard';
import {
  fetchIncomingFr,
  fetchOutgoingFr,
  fetchUserInformation,
  fetchUsers,
} from './fetch_requests/user.fetch';

export default function UserSearch() {
  const [allUsers, setAllUsers] = useState();
  const [signedUserInfo, setSignedUserInfo] = useState();
  const [outgoingFr, setOutgoingFr] = useState();
  const [incomingFr, setIncomingFr] = useState();

  function updateOutgoing() {
    fetchOutgoingFr().then(
      function (value) {
        if (value.response.status === 200) {
          setOutgoingFr(value.users);
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }

  useEffect(() => {
    fetchUsers().then(
      function (value) {
        if (value.response.status === 200) {
          setAllUsers(value.users);
        }
      },
      function (error) {
        console.log(error);
      },
    );
    updateOutgoing();
    fetchIncomingFr().then(
      function (value) {
        if (value.response.status === 200) {
          setIncomingFr(value.users.friend_requests);
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);

  useEffect(() => {
    fetchUserInformation().then(
      function (value) {
        if (value.response.status === 200) {
          setSignedUserInfo(value.user);
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-r from-emerald-200 to-purple-300 min-h-screen-nav dark:from-indigo-600 dark:to-green-600">
        <h1 className="bg-gradient-to-t from-transparent to-blue-400 dark:from-transparent dark:to-green-600 p-2 font-mono border-t-2 border-t-neutral-900">
          Outgoing Friend Requests
        </h1>
        <ul>
          {allUsers && signedUserInfo && outgoingFr
            ? outgoingFr.map((user) => {
                return (
                  <UserCard
                    key={user._id}
                    user={user}
                    signedUserInfo={signedUserInfo}
                    setSignedUserInfo={setSignedUserInfo}
                  />
                );
              })
            : null}
        </ul>
        <h1 className="bg-gradient-to-t from-transparent to-blue-400 dark:from-transparent dark:to-green-600 p-2 font-mono border-t-2 border-t-neutral-900">
          Incoming Friend Requests
        </h1>
        <ul>
          {allUsers && signedUserInfo && incomingFr
            ? incomingFr.map((user) => {
                return (
                  <UserCard
                    key={user._id}
                    user={user}
                    signedUserInfo={signedUserInfo}
                    setSignedUserInfo={setSignedUserInfo}
                  />
                );
              })
            : null}
        </ul>
        <h1 className="bg-gradient-to-t from-transparent to-blue-400 dark:from-transparent dark:to-green-600 p-2 font-mono border-t-2 border-t-neutral-900">
          Friends
        </h1>
        <ul>
          {allUsers && signedUserInfo
            ? allUsers.map((user) => {
                if (user._id === signedUserInfo._id) return;
                if (signedUserInfo.friends_list.includes(user._id))
                  return (
                    <UserCard
                      key={user._id}
                      user={user}
                      signedUserInfo={signedUserInfo}
                      setSignedUserInfo={setSignedUserInfo}
                    />
                  );
              })
            : null}
        </ul>
        <h1 className="bg-gradient-to-t from-transparent to-blue-400 dark:from-transparent dark:to-green-600 p-2 font-mono border-t-2 border-t-neutral-900">
          SocialM Users
        </h1>
        <ul>
          {allUsers && signedUserInfo && outgoingFr
            ? allUsers.map((user) => {
                if (user._id === signedUserInfo._id) return;
                if (signedUserInfo.friend_requests.includes(user._id)) return;
                if (signedUserInfo.friends_list.includes(user._id)) return;
                if (
                  outgoingFr.some(
                    (friend_request) => friend_request._id === user._id,
                  )
                )
                  return;

                return (
                  <UserCard
                    key={user._id}
                    user={user}
                    signedUserInfo={signedUserInfo}
                    setSignedUserInfo={setSignedUserInfo}
                    updateOutgoing={updateOutgoing}
                  />
                );
              })
            : null}
        </ul>
      </div>
      <Nav timeline={true} />
    </div>
  );
}
