import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import PostCard from './components/PostCard';
import WideNav from './components/WideNav';
import { fetchTimeline } from './fetch_requests/post.fetch';
import { fetchUserInformation } from './fetch_requests/user.fetch';

export default function Timeline() {
  const [timeline, setTimeline] = useState();
  const [userInformation, setUserInformation] = useState();

  useEffect(() => {
    fetchUserInformation().then(
      function (value) {
        if (value.response.status === 200) {
          setUserInformation(value.user);
          fetchTimeline().then((value) => setTimeline(value.timeline));
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);

  const [mobile, setMobile] = useState(true);

  function screenWidth(event) {
    if (event.target.innerWidth > 768) setMobile(false);
    if (event.target.innerWidth <= 768) setMobile(true);
  }

  useEffect(() => {
    if (window.innerWidth > 768) setMobile(false);
    window.onresize = screenWidth;
  });

  return (
    <div
      className={`w-full hide-scroll ${
        mobile
          ? 'min-h-nav grid justify-items-center'
          : 'min-h-screen flex justify-center'
      }  `}
    >
      {mobile ? null : <WideNav setTimeline={setTimeline} />}
      <ul
        className={`bg-gradient-to-r from-yellow-200 to-rose-300 max-w-[500px] dark:from-indigo-600 dark:to-green-600 overflow-auto hide-scroll ${
          mobile ? 'min-h-screen-nav h-screen-nav' : 'min-h-screen h-screen'
        }  `}
      >
        {timeline
          ? timeline.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                user={userInformation}
                setTimeline={setTimeline}
              />
            ))
          : null}
      </ul>
      {timeline ? null : (
        <ul
          className={`bg-gradient-to-r from-yellow-200 to-rose-300 max-w-[500px] w-full dark:from-indigo-600 dark:to-green-600 overflow-auto hide-scroll ${
            mobile ? 'min-h-screen-nav h-screen-nav' : 'min-h-screen h-screen'
          }  `}
        ></ul>
      )}
      {mobile ? <Nav setTimeline={setTimeline} /> : null}
    </div>
  );
}
