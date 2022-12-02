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

  const [showDescription, setShowDescription] = useState(true);

  function screenWidth(event) {
    if (event.target.innerWidth >= 1024) setShowDescription(true);
    if (event.target.innerWidth < 1024) setShowDescription(false);
  }

  useEffect(() => {
    if (window.innerWidth >= 1024) setShowDescription(true);
    if (window.innerWidth < 1024) setShowDescription(false);
    window.addEventListener('resize', screenWidth);
  }, []);

  const [theme, setTheme] = useState(false);

  useEffect(() => {
    if (localStorage.dark === 'true') {
      setTheme(true);
    } else {
      setTheme(false);
    }
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
          className={`flex items-center px-2 py-1 hover:bg-neutral-900/50 w-full gap-2 ${
            window.location.pathname === '/timeline'
              ? `fill-indigo-500 text-indigo-500`
              : null
          }`}
        >
          {icons.timeline} {showDescription ? 'Timeline' : null}
        </Link>
        <Link
          to={`/userSearch`}
          className={`flex items-center px-2 py-1 hover:bg-neutral-900/50 w-full gap-2 ${
            window.location.pathname === '/userSearch'
              ? `fill-pink-500 text-pink-500`
              : null
          }`}
        >
          {icons.friendList} {showDescription ? 'Users' : null}
        </Link>
        <Link
          to={`/notifications`}
          className={`flex items-center px-2 py-1 hover:bg-neutral-900/50 w-full gap-2 ${
            notificationPending ? `fill-rose-500 text-rose-500` : null
          } ${
            window.location.pathname === '/notifications'
              ? `fill-cyan-500 text-cyan-500`
              : null
          }`}
        >
          {notificationPending ? icons.notificationAlert : icons.notifications}{' '}
          {showDescription ? 'Notifications' : null}
        </Link>
        <Link
          to={`/conversations`}
          className={`flex items-center px-2 py-1 hover:bg-neutral-900/50 w-full gap-2 ${
            window.location.pathname === '/conversations'
              ? `fill-emerald-500 text-emerald-500`
              : null
          }`}
        >
          {icons.chat} {showDescription ? 'Chat' : null}
        </Link>
        <Link
          className={`flex items-center px-2 py-1 hover:bg-neutral-900/50 w-full gap-2 ${
            window.location.pathname === '/user'
              ? `fill-fuchsia-500 text-fuchsia-500`
              : null
          }`}
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
          className="flex items-center px-2 py-1 hover:bg-neutral-900/50 w-full gap-2"
        >
          {theme ? icons.darkNav : icons.lightNav}{' '}
          {showDescription ? 'Theme' : null}
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('Authorization');
            navigate(`${process.env.PUBLIC_URL}/`, { replace: true });
          }}
          className="flex items-center px-2 py-1 hover:bg-neutral-900/50 w-full gap-2"
        >
          {icons.logoutNav} {showDescription ? 'Sign Out' : null}
        </button>

        {setPostInformation ? (
          <button
            onClick={() => {
              setNewCommentVisible(true);
            }}
            className="w-full flex justify-center right-3 bg-green-400 rounded-full p-2 transition-all hover:bg-green-300 fill-neutral-900"
          >
            {icons.bigComment}
          </button>
        ) : (
          <button
            className="w-full flex justify-center right-3 bg-green-400 rounded-full p-2 transition-all hover:bg-green-300 fill-neutral-900"
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
