import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './SignIn';
import Timeline from './Timeline';

const RouteSwitch = () => {
  return (
    <BrowserRouter basename={'/'}>
      <Routes>
        <Route
          path="*"
          element={<Navigate to={`/timeline`} replace={true} />}
        />
        <Route path={'/timeline'} element={<Timeline />} />
        <Route path={'/signIn/:validation'} element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
