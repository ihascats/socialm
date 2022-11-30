import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import NotificationCard from './components/NotificationCard';
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

  return (
    <div>
      <div className="bg-gradient-to-b from-violet-800 to-cyan-600 h-screen-nav min-h-screen-nav max-h-screen text-neutral-300 overflow-auto hide-scroll">
        <button
          className="w-full bg-red-500 p-2 sticky top-0"
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
      <Nav timeline={true} />
    </div>
  );
}
