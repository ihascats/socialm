import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icons from './Icons';
import NewComment from './NewComment';
import NewPost from './NewPost';
import { io } from 'socket.io-client';

export default function WideNav({
  setTimeline,
  setUserPosts,
  setPostInformation,
  postId,
  newUpload,
  newCommentUpload,
}) {
  const [newPostVisible, setNewPostVisible] = useState(false);
  const [newCommentVisible, setNewCommentVisible] = useState(false);
  const icons = Icons();

  const navigate = useNavigate();

  const [notificationPending, setNotificationPending] = useState(false);
  const socket = io(process.env.REACT_APP_APICHAT, {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
    query: { Authorization: localStorage.Authorization },
  });

  useEffect(() => {
    socket.on('unread-notification', function (status) {
      if (status !== notificationPending) setNotificationPending(status);
    });
    socket.emit('check-notifications');
    const checkNotifications = setInterval(() => {
      socket.emit('check-notifications');
    }, 20000);
    return function stopTimer() {
      clearInterval(checkNotifications);
      socket.disconnect();
    };
  }, []);

  function isLocalStorageDescription() {
    if (localStorage.description === 'true') {
      return true;
    }
    if (localStorage.description === 'false') {
      return false;
    }
    return window.innerWidth >= 1024;
  }

  const [showDescription, setShowDescription] = useState(
    isLocalStorageDescription(),
  );

  function screenWidth(event) {
    const isDescriptionVisible = event.target.innerWidth >= 1024;
    setShowDescription(isDescriptionVisible);
    localStorage.description = isDescriptionVisible;
  }

  useEffect(() => {
    if (localStorage.description) {
      setShowDescription(isLocalStorageDescription());
    } else {
      const isDescriptionVisible = window.innerWidth >= 1024;
      setShowDescription(isDescriptionVisible);
      localStorage.description = isDescriptionVisible;
    }
    window.addEventListener('resize', screenWidth);
  }, []);

  const [theme, setTheme] = useState(false);

  useEffect(() => {
    setTheme(localStorage.dark === 'true');
  }, []);

  return localStorage.Authorization ? (
    <div className="flex">
      <nav
        className={`grid gap-6 items-end justify-items-center sticky p-2 bottom-0 h-fit fill-neutral-900 dark:fill-neutral-400 ${
          showDescription ? 'w-44 -ml-44' : null
        }`}
      >
        <Link
          to={`/timeline`}
          className={`btn btn-indigo rounded-md flex items-center px-2 py-1 w-full gap-2 ${
            window.location.pathname === '/socialm/timeline'
              ? `fill-indigo-500 text-indigo-500`
              : null
          } ${showDescription ? null : 'w-fit'}`}
        >
          {icons.timeline} {showDescription ? 'Timeline' : null}
        </Link>
        <Link
          to={`/userSearch`}
          className={`btn btn-yellow rounded-md flex items-center px-2 py-1 w-full gap-2 ${
            window.location.pathname === '/socialm/userSearch'
              ? `fill-amber-500 text-amber-500`
              : null
          } ${showDescription ? null : 'w-fit'}`}
        >
          {icons.friendList} {showDescription ? 'Users' : null}
        </Link>
        <Link
          to={`/notifications`}
          className={`btn btn-cyan rounded-md flex items-center px-2 py-1 w-full gap-2 ${
            notificationPending ? `fill-rose-500 text-rose-500` : null
          } ${
            window.location.pathname === '/socialm/notifications'
              ? `fill-cyan-500 text-cyan-500`
              : null
          } ${showDescription ? null : 'w-fit'}`}
        >
          {notificationPending ? icons.notificationAlert : icons.notifications}{' '}
          {showDescription ? 'Notifications' : null}
        </Link>
        <Link
          to={`/conversations`}
          className={`btn btn-emerald rounded-md flex items-center px-2 py-1 w-full gap-2 ${
            window.location.pathname === '/socialm/conversations'
              ? `fill-emerald-500 text-emerald-500`
              : null
          } ${showDescription ? null : 'w-fit'}`}
        >
          {icons.chat} {showDescription ? 'Chat' : null}
        </Link>
        <Link
          className={`btn btn-fuchsia rounded-md flex items-center px-2 py-1 w-full gap-2 ${
            window.location.pathname === '/socialm/user'
              ? `fill-fuchsia-500 text-fuchsia-500`
              : null
          } ${showDescription ? null : 'w-fit'}`}
          to={`/user`}
        >
          {icons.profileNav} {showDescription ? 'Profile' : null}
        </Link>
        <button
          onClick={() => {
            document.body.classList.toggle('dark');
            localStorage.dark = !theme;
            setTheme((prev) => !prev);
          }}
          className={`btn btn-neutral rounded-md flex items-center px-2 py-1 w-full gap-2 ${
            showDescription ? null : 'w-fit'
          }`}
        >
          {theme ? icons.darkNav : icons.lightNav}{' '}
          {showDescription ? 'Theme' : null}
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('Authorization');
            navigate(`${process.env.PUBLIC_URL}/`, { replace: true });
          }}
          className={`btn btn-red rounded-md flex items-center px-2 py-1 w-full gap-2 ${
            showDescription ? null : 'w-fit'
          }`}
        >
          {icons.logoutNav} {showDescription ? 'Sign Out' : null}
        </button>

        {setPostInformation ? (
          <button
            onClick={() => {
              setNewCommentVisible(true);
            }}
            className="btn btn-green w-full flex justify-center right-3 bg-green-400 rounded-full p-2 transition-all hover:bg-green-300 fill-neutral-900"
          >
            {icons.bigComment}
          </button>
        ) : (
          <button
            className="btn btn-green w-full flex justify-center right-3 bg-green-400 rounded-full p-2 transition-all hover:bg-green-300 fill-neutral-900"
            onClick={() => {
              setNewPostVisible(true);
            }}
          >
            {icons.newPost}
          </button>
        )}
      </nav>
      {newPostVisible ? (
        <NewPost
          setNewPostVisible={setNewPostVisible}
          setTimeline={setTimeline}
          setUserPosts={setUserPosts}
          showDescription={showDescription}
          newUpload={newUpload}
        />
      ) : null}
      {newCommentVisible ? (
        <NewComment
          setNewCommentVisible={setNewCommentVisible}
          postId={postId}
          setTimeline={setTimeline}
          setUserPosts={setUserPosts}
          setPostInformation={setPostInformation}
          showDescription={showDescription}
          newCommentUpload={newCommentUpload}
        />
      ) : null}
    </div>
  ) : (
    <nav
      className={`grid gap-6 items-end justify-items-center sticky p-2 bottom-0 h-fit fill-neutral-900 ${
        showDescription ? 'w-44' : null
      }`}
    >
      <a
        href={`${process.env.REACT_APP_APILINK}/auth/google`}
        className="h-full flex gap-4 text-lg items-center"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
          alt="google logo"
          className="h-12"
        />
        Sign In
      </a>
      <button
        onClick={() => {
          localStorage.setItem('Authorization', process.env.REACT_APP_GUEST);
          navigate(`${process.env.PUBLIC_URL}/`, { replace: true });
        }}
        className="h-full text-lg items-center"
      >
        Sign In as Guest
      </button>
    </nav>
  );
}
