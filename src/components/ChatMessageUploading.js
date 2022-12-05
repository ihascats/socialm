import Icons from './Icons';

export default function ChatMessageUploading() {
  const icons = Icons();
  return (
    <div>
      <div className="flex flex-col font-mono items-center justify-center dark:fill-neutral-50 h-[100px] gap-2 border-b-2 border-neutral-900 dark:border-neutral-400 pb-2 max-w-full whitespace-nowrap">
        {icons.loading}
      </div>
    </div>
  );
}
