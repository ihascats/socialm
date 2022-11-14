import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import PostList from './components/PostList';
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
    <div>
      {localStorage.Authorization ? null : (
        <a href={`${process.env.REACT_APP_APILINK}/auth/google`}>Google</a>
      )}

      <ul className="bg-gradient-to-br from-yellow-200 to-pink-300 min-h-screen-nav dark:from-indigo-600 dark:to-green-600">
        {timeline
          ? timeline.map((post) => (
              <PostList key={post._id} post={post} user={userInformation} />
            ))
          : null}
      </ul>
      <Nav />
    </div>
  );
}
