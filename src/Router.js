import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Conversations from './Conversations';
import Loading from './Loading';
import Notifications from './Notifications';
import Post from './Post';
import SignInPage from './SignInPage';
import Timeline from './Timeline';
import User from './User';
import UserSearch from './UserSearch';
import SignUp from './SignUp';

const RouteSwitch = () => {
  useEffect(() => {
    if (localStorage.dark === 'true') {
      document.body.classList.add('dark');
    }
    if (
      !('connected' in localStorage) &&
      window.location.pathname !== `${process.env.PUBLIC_URL}/loading`
    ) {
      window.location.pathname = `${process.env.PUBLIC_URL}/loading`;
    }
  }, []);

  return (
    <BrowserRouter basename={'/socialm'}>
      <Routes>
        <Route
          path="*"
          element={<Navigate to={`/timeline`} replace={true} />}
        />
        <Route path={'/loading'} element={<Loading />} />
        <Route path={'/conversations'} element={<Conversations />} />
        <Route path={'/notifications'} element={<Notifications />} />
        <Route path={'/timeline'} element={<Timeline />} />
        <Route path={'/signIn'} element={<SignInPage />} />
        <Route path={'/userSearch'} element={<UserSearch />} />
        <Route path={'/user'} element={<User />} />
        <Route path={'/user/:id'} element={<User />} />
        <Route path={'/post/:id'} element={<Post />} />
        <Route path={'/signUp/:validation'} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
