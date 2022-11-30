import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import PostCard from './components/PostCard';
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

  return (
    <div className="w-full grid justify-items-center min-h-nav hide-scroll">
      <ul className="bg-gradient-to-r from-yellow-200 to-rose-300 min-h-screen-nav max-w-[500px] dark:from-indigo-600 dark:to-green-600 h-screen-nav overflow-auto hide-scroll">
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
      <Nav setTimeline={setTimeline} />
    </div>
  );
}
