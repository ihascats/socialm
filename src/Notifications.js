import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from './components/Icons';
import Nav from './components/Nav';
import NotificationCard from './components/NotificationCard';
import WideNav from './components/WideNav';
import {
  fetchNotifications,
  fetchPutClearNotifications,
} from './fetch_requests/notifications.fetch';

export default function Notifications() {
  const [allNotifications, setAllNotifications] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.Authorization) {
      navigate(`${process.env.PUBLIC_URL}/signIn`, { replace: true });
    }
  });

  useEffect(() => {
    fetchNotifications().then(
      function (value) {
        if (value.response.status === 200) {
          setAllNotifications(value.notifications);
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);

  function clearNotifications() {
    fetchPutClearNotifications().then(
      function (value) {
        if (value.response.status === 200) {
          setAllNotifications(value.notifications);
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }

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

  const icons = Icons();

  return (
    <div
      className={`w-full hide-scroll dark:bg-neutral-900 dark:text-neutral-50 dark:fill-neutral-400 ${
        mobile
          ? 'min-h-nav grid justify-items-center'
          : 'min-h-screen flex justify-center'
      }`}
    >
      {mobile ? null : <WideNav />}
      <div
        className={`h-screen-nav max-w-[500px] w-full overflow-auto hide-scroll border-x-2 border-neutral-900 dark:border-neutral-400 ${
          mobile ? 'min-h-screen-nav max-h-screen' : 'min-h-screen max-h-screen'
        }`}
      >
        <button
          className="w-full bg-red-500 p-2 sticky top-0 z-50"
          onClick={clearNotifications}
        >
          Clear notifications
        </button>
        <ul className="min-h-screen-[100vh - 104px] overflow-auto hide-scroll scroll-smooth">
          {allNotifications ? (
            allNotifications.unread_notifications
              .reverse()
              .map((unread, index) => (
                <NotificationCard
                  key={`unread-${index}`}
                  notificationInfo={unread}
                  unread={true}
                />
              ))
          ) : (
            <div className="w-full min-h-screen-user h-full flex flex-col font-mono items-center justify-center dark:fill-neutral-50">
              {icons.loading}
              Notifications Loading..
            </div>
          )}
          {allNotifications
            ? allNotifications.read_notifications
                .reverse()
                .map((read, index) => (
                  <NotificationCard
                    key={`read-${index}`}
                    notificationInfo={read}
                  />
                ))
            : null}
        </ul>
      </div>
      {mobile ? <Nav /> : null}
    </div>
  );
}
