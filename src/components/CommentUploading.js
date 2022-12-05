import Icons from './Icons';

export default function CommentUploading() {
  const icons = Icons();
  return (
    <div>
      <div className="bg-neutral-900/20 dark:bg-neutral-50/20 border-l-4 max-w-[100vw] h-[124px] dark:fill-neutral-50 border-l-yellow-500 dark:border-l-yellow-500 border-b-2 border-neutral-900  dark:border-neutral-400">
        <div className="h-full w-full flex justify-center items-center">
          {icons.loading}
        </div>
      </div>
    </div>
  );
}
