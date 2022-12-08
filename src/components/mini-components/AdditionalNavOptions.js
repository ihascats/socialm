import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icons from '../Icons';

export default function AdditionalNavOptions() {
  const navigate = useNavigate();
  const icons = Icons();
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    setTheme(localStorage.dark === 'true');
  }, []);

  return (
    <div className="z-[200] fixed bottom-16 right-0 border-l-4 border-t-4 bg-neutral-900/60 text-neutral-50 fill-neutral-400 border-neutral-900 dark:border-neutral-400 w-40">
      <Link
        className="flex items-center px-2 py-1 hover:bg-neutral-900/50 w-full"
        to={`/user`}
      >
        {icons.profile} Profile
      </Link>
      <button
        onClick={() => {
          localStorage.removeItem('Authorization');
          navigate(`${process.env.PUBLIC_URL}/`, { replace: true });
        }}
        className="flex items-center px-2 py-1 hover:bg-neutral-900/50 w-full"
      >
        {icons.logout} Sign Out
      </button>
      <button
        onClick={() => {
          document.body.classList.toggle('dark');
          localStorage.dark = !theme;
          setTheme((prev) => !prev);
        }}
        className="flex items-center px-2 py-1 hover:bg-neutral-900/50 w-full"
      >
        {theme ? icons.dark : icons.light} Theme
      </button>
    </div>
  );
}
