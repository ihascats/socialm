import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icons from './Icons';
import AdditionalNavOptions from './mini-components/AdditionalNavOptions';
import NewComment from './NewComment';
import NewPost from './NewPost';
import { io } from 'socket.io-client';

export default function Nav({
  setTimeline,
  setUserPosts,
  setPostInformation,
  postId,
  newUpload,
  newCommentUpload,
}) {
  const [newPostVisible, setNewPostVisible] = useState(false);
  const [newCommentVisible, setNewCommentVisible] = useState(false);
  const [viewAdditional, setViewAdditional] = useState(false);
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
    const handleUnreadNotification = (status) => {
      if (status !== notificationPending) {
        setNotificationPending(status);
      }
    };

    socket.on('unread-notification', handleUnreadNotification);
    socket.emit('check-notifications');
    const checkNotifications = setInterval(() => {
      socket.emit('check-notifications');
    }, 20000);

    return function stopTimer() {
      clearInterval(checkNotifications);
      socket.off('unread-notification', handleUnreadNotification);
      socket.disconnect();
    };
  }, []);

  return localStorage.Authorization ? (
    <nav
      className={`grid grid-cols-5 max-w-[100vw] z-[100] items-end justify-items-center sticky p-2 bottom-0 w-full h-16 border-t-4 bg-neutral-200 dark:bg-neutral-900 fill-neutral-900 dark:fill-neutral-400 border-neutral-900 dark:border-neutral-400`}
    >
      <Link
        to={`/timeline`}
        className={`${
          window.location.pathname === '/socialm/timeline'
            ? `fill-indigo-500`
            : null
        }`}
      >
        {icons.timeline}
      </Link>
      <Link
        to={`/userSearch`}
        className={`${
          window.location.pathname === '/socialm/userSearch'
            ? `fill-pink-500`
            : null
        }`}
      >
        {icons.friendList}
      </Link>
      {setPostInformation ? (
        <button
          onClick={() => {
            setNewCommentVisible(true);
          }}
          className={`fixed fill-neutral-900 ${
            viewAdditional ? `bottom-[168px]` : `bottom-24` //92+64+12=1
          } right-3 bg-green-400 rounded-full p-2 transition-all`}
        >
          {icons.bigComment}
        </button>
      ) : (
        <button
          className={`fixed fill-neutral-900 ${
            viewAdditional ? `bottom-[168px]` : `bottom-24` //92+64+12=1
          } right-3 bg-green-400 rounded-full p-2 transition-all`}
          onClick={() => {
            setNewPostVisible(true);
          }}
        >
          {icons.newPost}
        </button>
      )}
      <Link
        to={`/notifications`}
        className={`${notificationPending ? `fill-rose-500` : null} ${
          window.location.pathname === '/socialm/notifications'
            ? `fill-cyan-500`
            : null
        }`}
      >
        {notificationPending ? icons.notificationAlert : icons.notifications}
      </Link>
      <Link
        to={`/conversations`}
        className={`${
          window.location.pathname === '/socialm/conversations'
            ? `fill-emerald-500`
            : null
        }`}
      >
        {icons.chat}
      </Link>
      <button
        onClick={() => {
          setViewAdditional((prev) => !prev);
        }}
        className={`${viewAdditional ? `fill-purple-500` : null}`}
      >
        {icons.menuUp}
      </button>
      {newPostVisible ? (
        <NewPost
          setNewPostVisible={setNewPostVisible}
          setTimeline={setTimeline}
          setUserPosts={setUserPosts}
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
          newCommentUpload={newCommentUpload}
        />
      ) : null}
      {viewAdditional ? <AdditionalNavOptions /> : null}
    </nav>
  ) : (
    navigate(`${process.env.PUBLIC_URL}/signIn`, { replace: true })
  );
}
