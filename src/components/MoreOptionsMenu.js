import Icons from './Icons';

export default function MoreOptionsMenu() {
  const icons = Icons();

  return (
    <div className="optionsMenu absolute mt-3 grid right-10 bg-lime-200 pl-2 pr-14 py-1 justify-items-start font-mono rounded-lg">
      <button className="flex gap-2">
        {icons.edit}
        <p>Edit</p>
      </button>
      <button className="flex gap-2">
        {icons.deleteSVG}
        <p>Delete</p>
      </button>
    </div>
  );
}
