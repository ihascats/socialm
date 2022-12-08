import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from './components/Icons';
import Nav from './components/Nav';
import PostCard from './components/PostCard';
import PostUploading from './components/PostUploading';
import WideNav from './components/WideNav';
import { fetchTimeline } from './fetch_requests/post.fetch';
import { fetchUserInformation } from './fetch_requests/user.fetch';

export default function Timeline() {
  const [timeline, setTimeline] = useState();
  const [userInformation, setUserInformation] = useState();

  const icons = Icons();

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.Authorization) {
      navigate(`/signIn`, { replace: true });
    }
  }, []);

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
    setMobile(event.target.innerWidth <= 768);
  }

  useEffect(() => {
    setMobile(window.innerWidth <= 768);
    window.addEventListener('resize', screenWidth);
  }, []);

  const [uploading, setUploading] = useState([]);

  function newUpload(bool) {
    const clone = structuredClone(uploading);
    if (bool) {
      clone.push(1);
      setUploading(clone);
    } else {
      clone.pop();
      setUploading(clone);
    }
  }

  return (
    <div
      className={`w-full hide-scroll dark:bg-neutral-900 dark:text-neutral-50 dark:fill-neutral-400 ${
        mobile
          ? 'min-h-nav grid justify-items-center'
          : 'min-h-screen flex justify-center'
      }  `}
    >
      {mobile ? null : (
        <WideNav setTimeline={setTimeline} newUpload={newUpload} />
      )}
      {timeline ? (
        <ul
          className={`max-w-[500px] w-full overflow-auto hide-scroll border-x-2 border-neutral-900 dark:border-neutral-400 ${
            mobile ? 'min-h-screen-nav h-screen-nav' : 'min-h-screen h-screen'
          }  `}
        >
          {uploading.length > 0 && timeline
            ? uploading.map((upload, index) => (
                <PostUploading key={`upload-${index}`} />
              ))
            : null}
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
          className={`max-w-[500px] flex flex-col font-mono items-center justify-center dark:fill-neutral-50 w-full overflow-auto hide-scroll border-x-2 border-neutral-900 dark:border-neutral-400 ${
            mobile ? 'min-h-screen-nav h-screen-nav' : 'min-h-screen h-screen'
          }  `}
        >
          {icons.loading}
          Timeline Loading..
        </ul>
      )}

      {mobile ? <Nav setTimeline={setTimeline} newUpload={newUpload} /> : null}
    </div>
  );
}
