import Icons from './components/Icons';

export default function Loading() {
  const icons = Icons();
  return (
    <div className="w-screen h-screen flex flex-col dark:text-white justify-center items-center dark:fill-neutral-50">
      {icons.loading}
      <p className="text-lg tracking-wider">
        establishing a connection with the server
      </p>
      <div className="font-mono text-xs flex">
        (This can take up to a several minutes)
        <p className="loader__dot">.</p>
        <p className="loader__dot">.</p>
      </div>
    </div>
  );
}
