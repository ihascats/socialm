import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { useEffect, useState } from 'react';
import { checkConnectionAndNavigate } from './fetch_requests/connection.fetch';

export default function SignInPage() {
  const navigate = useNavigate();

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    checkConnectionAndNavigate(setConnected, navigate);
  }, []);

  return connected ? (
    <div className="h-screen w-screen grid items-center justify-center dark:text-neutral-50">
      <nav
        className={`grid gap-6 w-56 items-end justify-items-center sticky p-2 bottom-0 h-fit fill-neutral-900`}
      >
        <h1 className="text-2xl font-mono font-bold">SocialM</h1>
        <a
          href={`${process.env.REACT_APP_APILINK}/auth/google`}
          className="h-16 flex gap-4 text-lg items-center w-full border-2 border-neutral-900 dark:border-neutral-400 hover:bg-black/10 dark:hover:bg-white/10 justify-center rounded-full"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
            alt="google logo"
            className="h-8"
          />
          Sign In
        </a>
        <button
          onClick={() => {
            localStorage.setItem('Authorization', process.env.REACT_APP_GUEST);
            navigate(`${process.env.PUBLIC_URL}/timeline`, { replace: true });
          }}
          className="h-16 flex text-lg items-center w-full border-2 border-neutral-900 dark:border-neutral-400 hover:bg-black/10 dark:hover:bg-white/10 justify-center rounded-full"
        >
          Sign In as Guest
        </button>
      </nav>
    </div>
  ) : (
    <Loading />
  );
}
