import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Post from './Post';
import SignIn from './SignIn';
import Timeline from './Timeline';
import User from './User';

const RouteSwitch = () => {
  return (
    <BrowserRouter basename={'/'}>
      <Routes>
        <Route
          path="*"
          element={<Navigate to={`/timeline`} replace={true} />}
        />
        <Route path={'/timeline'} element={<Timeline />} />
        <Route path={'/user'} element={<User />} />
        <Route path={'/post/:id'} element={<Post />} />
        <Route path={'/signIn/:validation'} element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
