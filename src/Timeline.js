import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './components/Nav';
import PostCard from './components/PostCard';
import WideNav from './components/WideNav';
import { fetchTimeline } from './fetch_requests/post.fetch';
import { fetchUserInformation } from './fetch_requests/user.fetch';

export default function Timeline() {
  const [timeline, setTimeline] = useState();
  const [userInformation, setUserInformation] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.Authorization) {
      navigate(`${process.env.PUBLIC_URL}/signIn`, { replace: true });
    }
  });

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
      className={`w-full hide-scroll dark:bg-neutral-900 dark:text-neutral-50 dark:fill-neutral-400 ${
        mobile
          ? 'min-h-nav grid justify-items-center'
          : 'min-h-screen flex justify-center'
      }  `}
    >
      {mobile ? null : <WideNav setTimeline={setTimeline} />}
      {timeline ? (
        <ul
          className={`max-w-[500px] w-full overflow-auto hide-scroll border-x-2 border-neutral-900 dark:border-neutral-400 ${
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
      ) : (
        <ul
          className={`max-w-[500px] w-full overflow-auto hide-scroll border-x-2 border-neutral-900 dark:border-neutral-400 ${
            mobile ? 'min-h-screen-nav h-screen-nav' : 'min-h-screen h-screen'
          }  `}
        ></ul>
      )}

      {mobile ? <Nav setTimeline={setTimeline} /> : null}
    </div>
  );
}
