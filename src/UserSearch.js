/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const [search, setSearch] = useState('');

  const [mobile, setMobile] = useState(false);

  function screenWidth(event) {
    if (event.target.innerWidth > 768) setMobile(false);
    if (event.target.innerWidth <= 768) setMobile(true);
  }

  useEffect(() => {
    if (window.innerWidth > 768) setMobile(false);
    if (window.innerWidth <= 768) setMobile(true);
    window.addEventListener('resize', screenWidth);
  });

  return (
    <div
      className={`w-full hide-scroll max-w-[100vw] ${
        mobile
          ? 'min-h-screen grid justify-items-center'
          : 'min-h-screen flex justify-center'
      }`}
    >
      {mobile ? null : <WideNav />}
      <div
        className={` w-full border-x-2 border-neutral-900 ${
          mobile
            ? 'min-h-screen-nav max-w-[100vw]'
            : 'max-w-[500px] min-h-screen h-screen-user-search overflow-auto hide-scroll'
        }`}
      >
        <div className="w-full px-2 py-1 sticky top-0 z-20">
          <input
            onInput={(event) => {
              setSearch(event.target.value);
            }}
            placeholder="Search for a user"
            className="w-full px-2 py-1 rounded-lg"
          ></input>
        </div>
        <ul
          className={`fixed max-w-[500px] w-full z-20 ${
            mobile ? null : 'max-h-screen-user-search overflow-auto hide-scroll'
          }`}
        >
          {allUsers && search.length > 2
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
        <h1 className="p-2 font-mono border-t-2 border-t-neutral-900">
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
        <h1 className="p-2 font-mono border-t-2 border-t-neutral-900">
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
        <h1 className="p-2 font-mono border-t-2 border-t-neutral-900">
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
        <h1 className="p-2 font-mono border-t-2 border-t-neutral-900">
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
      {mobile ? <Nav /> : null}
    </div>
  );
}
