import { useEffect } from 'react';
import Icons from './Icons';

export default function MoreOptionsMenu({ setMenuVisible }) {
  const icons = Icons();

  useEffect(() => {
    window.ontouchmove = () => {
      setMenuVisible(false);
      window.ontouchmove = null;
    };
    window.ontouchend = () => {
      setMenuVisible(false);
      window.ontouchend = null;
    };
  }, []);

  return (
    <div
      onMouseLeave={() => {
        setMenuVisible(false);
      }}
      onClick={(event) => {
        event.preventDefault();
      }}
      onTouchEnd={(event) => {
        event.stopPropagation();
      }}
      className="absolute grid right-2 w-32 bg-lime-200 py-1 font-mono rounded-lg"
    >
      <button className="flex gap-2 hover:bg-lime-500 px-2">
        {icons.edit}
        <p>Edit</p>
      </button>
      <button className="flex gap-2 hover:bg-lime-500 px-2">
        {icons.deleteSVG}
        <p>Delete</p>
      </button>
    </div>
  );
}
