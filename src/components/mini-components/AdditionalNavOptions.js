import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icons from '../Icons';

export default function AdditionalNavOptions() {
  const navigate = useNavigate();
  const icons = Icons();
  const [theme, setTheme] = useState(false);

  return (
    <div className="fixed bottom-16 right-0 border-l-4 border-t-4 border-neutral-900 bg-lime-400 w-40 z-50">
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
          setTheme((prev) => !prev);
        }}
        className="flex items-center px-2 py-1 hover:bg-neutral-900/50 w-full"
      >
        {theme ? icons.dark : icons.light} Theme
      </button>
    </div>
  );
}
