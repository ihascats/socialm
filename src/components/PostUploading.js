import Icons from './Icons';

export default function PostUploading() {
  const icons = Icons();
  return (
    <div>
      <div className="p-2 border-b-2 border-neutral-900 dark:border-neutral-400 max-w-[100vw] h-[124px] dark:fill-neutral-50">
        <div className="h-full w-full flex justify-center items-center">
          {icons.loading}
        </div>
      </div>
    </div>
  );
}
