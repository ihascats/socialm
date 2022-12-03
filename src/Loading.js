import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from './components/Icons';
import { checkConnection } from './fetch_requests/connection.fetch';

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    checkConnection().then((response) => {
      if (response.connected === true) {
        localStorage.connected = true;
        if (localStorage.Authorization) {
          navigate(`${process.env.PUBLIC_URL}/timeline`, { replace: true });
          window.onunload = () => {
            localStorage.removeItem('connected');
          };
        } else {
          navigate(`${process.env.PUBLIC_URL}/signIn`, { replace: true });
          window.onunload = () => {
            localStorage.removeItem('connected');
          };
        }
      }
    });
  });

  const icons = Icons();
  return (
    <div className="w-screen h-screen flex justify-center items-center dark:fill-neutral-50">
      {icons.loading}
    </div>
  );
}
