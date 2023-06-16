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
import { checkConnectionAndNavigate } from './fetch_requests/connection.fetch';
import Loading from './Loading';
import { isLocalStorageMobile, screenWidth } from './screen_size/isMobile';

export default function Notifications() {
  const [allNotifications, setAllNotifications] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!localStorage.Authorization) {
          navigate(`${process.env.PUBLIC_URL}/signIn`, { replace: true });
          return;
        }

        const notificationsResponse = await fetchNotifications();
        if (notificationsResponse.response.status === 200) {
          setAllNotifications(notificationsResponse.notifications);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  async function clearNotifications() {
    try {
      const value = await fetchPutClearNotifications();
      if (value.response.status === 200) {
        setAllNotifications(value.notifications);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [mobile, setMobile] = useState(isLocalStorageMobile());

  useEffect(() => {
    if (localStorage.mobile) {
      setMobile(isLocalStorageMobile());
    } else {
      const isMobile = window.innerWidth <= 768;
      setMobile(isMobile);
      localStorage.mobile = isMobile;
    }
    window.addEventListener('resize', (event) => screenWidth(event, setMobile));
  }, []);

  const [connected, setConnected] = useState(localStorage.connected);

  useEffect(() => {
    checkConnectionAndNavigate(setConnected, navigate);
  }, []);

  const icons = Icons();

  return connected ? (
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
  ) : (
    <Loading />
  );
}
