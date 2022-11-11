import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
