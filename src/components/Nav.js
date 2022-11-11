import { Link } from 'react-router-dom';
import Icons from './Icons';

export default function Nav() {
  const icons = Icons();
  return (
    <nav className="grid grid-cols-5 justify-items-center fixed p-2 bottom-0 w-full h-fit border-t-4 bg-lime-300 fill-neutral-900 border-neutral-900 dark:bg-neutral-900 dark:fill-lime-300 dark:border-lime-300">
      <Link to={`/user`}>{icons.profile}</Link>
      <button>{icons.friendList}</button>
      <button>{icons.newPost}</button>
      <button>{icons.notifications}</button>
      <button>{icons.settings}</button>
    </nav>
  );
}
