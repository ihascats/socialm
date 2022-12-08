/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from './components/Icons';
import Nav from './components/Nav';
import UserCard from './components/UserCard';
import WideNav from './components/WideNav';
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

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.Authorization) {
      navigate(`${process.env.PUBLIC_URL}/signIn`, { replace: true });
    }
  });

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

  function updateIncoming() {
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
  }

  useEffect(() => {
    fetchUsers()
      .then((value) => {
        if (value.response.status === 200) {
          setAllUsers(value.users);
        }
        return value;
      })
      .catch((error) => console.log(error));
    updateOutgoing();
    fetchIncomingFr()
      .then((value) => {
        if (value.response.status === 200) {
          setIncomingFr(value.users.friend_requests);
        }
        return value;
      })
      .catch((error) => console.log(error));
    fetchUserInformation()
      .then((value) => {
        if (value.response.status === 200) {
          setSignedUserInfo(value.user);
        }
        return value;
      })
      .catch((error) => console.log(error));
  }, []);

  const [search, setSearch] = useState('');

  const [mobile, setMobile] = useState(false);

  function screenWidth(event) {
    setMobile(event.target.innerWidth <= 768);
  }

  useEffect(() => {
    setMobile(window.innerWidth <= 768);
    window.addEventListener('resize', screenWidth);
  }, []);

  const icons = Icons();

  return (
    <div
      className={`w-full hide-scroll max-w-[100vw] dark:bg-neutral-900 dark:text-neutral-50 dark:fill-neutral-400 ${
        mobile
          ? 'min-h-screen grid justify-items-center'
          : 'min-h-screen flex justify-center'
      }`}
    >
      {mobile ? null : <WideNav />}
      <div
        className={`w-full max-w-[500px] border-x-2 border-neutral-900 dark:border-neutral-400 ${
          mobile
            ? 'min-h-screen-nav'
            : 'max-w-[500px] min-h-screen h-screen-user-search overflow-auto hide-scroll'
        }`}
      >
        <div className="w-full px-2 py-1 sticky top-0 dark:text-neutral-50 bg-neutral-200 z-20 dark:bg-neutral-900 ">
          <input
            onInput={(event) => {
              setSearch(event.target.value);
            }}
            placeholder="Search for a user"
            className="w-full px-2 py-1 rounded-lg dark:bg-neutral-700"
          ></input>
        </div>
        <ul
          className={`fixed max-w-[496px] w-full bg-neutral-400 dark:bg-neutral-800 ${
            mobile
              ? 'border-r-4'
              : 'max-h-screen-user-search overflow-auto hide-scroll border-r-2'
          }`}
        >
          {allUsers && signedUserInfo && search.length > 2
            ? allUsers.map((user) => {
                if (user._id === signedUserInfo._id) return;
                if (
                  user.username
                    .toLowerCase()
                    .trim()
                    .includes(search.toLowerCase().trim())
                )
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
        <h1 className="p-2 font-mono border-t-2 border-t-neutral-900 dark:border-neutral-400">
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
        <h1 className="p-2 font-mono border-t-2 border-t-neutral-900 dark:border-neutral-400">
          Incoming Friend Requests
        </h1>
        <ul>
          {allUsers && signedUserInfo && incomingFr
            ? incomingFr.map((user) => {
                if (signedUserInfo.friends_list.includes(user._id)) return;
                return (
                  <UserCard
                    key={user._id}
                    user={user}
                    signedUserInfo={signedUserInfo}
                    setSignedUserInfo={setSignedUserInfo}
                    updateIncoming={updateIncoming}
                  />
                );
              })
            : null}
        </ul>
        <h1 className="p-2 font-mono border-t-2 border-t-neutral-900 dark:border-neutral-400">
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
        <h1 className="p-2 font-mono border-t-2 border-t-neutral-900 dark:border-neutral-400">
          SocialM Users
        </h1>
        <ul>
          {allUsers && signedUserInfo && outgoingFr ? (
            allUsers.map((user) => {
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
          ) : (
            <div className="w-full h-full flex flex-col font-mono items-center justify-center dark:fill-neutral-50">
              {icons.loading}
              Loading..
            </div>
          )}
        </ul>
      </div>
      {mobile ? <Nav /> : null}
    </div>
  );
}
