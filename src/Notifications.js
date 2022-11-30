import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import NotificationCard from './components/NotificationCard';
import WideNav from './components/WideNav';
import {
  fetchNotifications,
  fetchPutClearNotifications,
} from './fetch_requests/notifications.fetch';

export default function Notifications() {
  const [allNotifications, setAllNotifications] = useState();

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
    window.onresize = screenWidth;
  });

  return (
    <div
      className={`w-full hide-scroll ${
        mobile
          ? 'min-h-nav grid justify-items-center'
          : 'min-h-screen flex justify-center'
      }`}
    >
      {mobile ? null : <WideNav />}
      <div
        className={`bg-gradient-to-b from-violet-800 to-cyan-600 h-screen-nav max-w-[500px] w-full text-neutral-300 overflow-auto hide-scroll ${
          mobile ? 'min-h-screen-nav max-h-screen' : 'min-h-screen max-h-screen'
        }`}
      >
        <button
          className="w-full bg-red-500 p-2 sticky top-0 z-50"
          onClick={clearNotifications}
        >
          Clear notifications
        </button>
        <ul className="min-h-screen-nav overflow-auto hide-scroll scroll-smooth">
          {allNotifications
            ? allNotifications.unread_notifications
                .reverse()
                .map((unread, index) => (
                  <NotificationCard
                    key={`unread-${index}`}
                    notificationInfo={unread}
                    unread={true}
                  />
                ))
            : null}
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
