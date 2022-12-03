import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Conversations from './Conversations';
import Loading from './Loading';
import Notifications from './Notifications';
import Post from './Post';
import SignIn from './SignIn';
import SignInPage from './SignInPage';
import Timeline from './Timeline';
import User from './User';
import UserSearch from './UserSearch';

const RouteSwitch = () => {
  useEffect(() => {
    if (localStorage.dark === 'true') {
      document.body.classList.add('dark');
    }
    if (
      !('connected' in localStorage) &&
      window.location.pathname !== '/loading'
    ) {
      window.location.pathname = '/loading';
    }
  }, []);

  return (
    <BrowserRouter basename={'/'}>
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
        <Route path={'/signIn/:validation'} element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
