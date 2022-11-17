import Icons from '../../Icons';

export default function MoreOptionsButton({ setMenuVisible }) {
  const icons = Icons();
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        setMenuVisible(true);
      }}
    >
      {icons.moreOptions}
    </button>
  );
}
