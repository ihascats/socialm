import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen grid items-center justify-center">
      <nav
        className={`grid gap-6 w-56 items-end justify-items-center sticky p-2 bottom-0 h-fit fill-neutral-900`}
      >
        <h1 className="text-2xl font-mono font-bold">SocialM</h1>
        <a
          href={`${process.env.REACT_APP_APILINK}/auth/google`}
          className="h-16 flex gap-4 text-lg items-center w-full bg-blue-200 justify-center rounded-full"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
            alt="google logo"
            className="h-12"
          />
          Sign In
        </a>
        <button
          onClick={() => {
            localStorage.setItem('Authorization', process.env.REACT_APP_GUEST);
            navigate(`${process.env.PUBLIC_URL}/timeline`, { replace: true });
          }}
          className="h-16 flex text-lg items-center w-full bg-blue-200 justify-center rounded-full"
        >
          Sign In as Guest
        </button>
      </nav>
    </div>
  );
}
