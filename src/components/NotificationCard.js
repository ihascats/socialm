import { Link } from 'react-router-dom';
import Icons from './Icons';

export default function NotificationCard({ notificationInfo, unread }) {
  const icons = Icons();
  if ('new_like' in notificationInfo) {
    // if comment is liked
    // Your "<partial comment text here>" or "post" was liked!
    // link to post
    return (
      <li
        className={`border-b-2 border-neutral-900 dark:border-neutral-400 fill-rose-500 ${
          unread ? `bg-neutral-600/30 dark:bg-neutral-300/30` : null
        }`}
      >
        <Link
          draggable={false}
          to={`/post/${notificationInfo.post}`}
          className={`flex px-2 py-4 justify-between ${
            'comment_text' in notificationInfo ? `fill-yellow-500` : null
          }`}
        >
          <p>
            Your{' '}
            {'comment_text' in notificationInfo
              ? `"${notificationInfo.comment_text.slice('0, 12')}.."`
              : 'post'}{' '}
            was liked!
          </p>
          <p>{icons.like}</p>
        </Link>
      </li>
    );
  }
  if ('new_comment' in notificationInfo) {
    // if new comment
    // New comment on your post!
    // link to post
    return (
      <li
        className={`border-b-2 border-neutral-900 dark:border-neutral-400 fill-yellow-500 ${
          unread ? `bg-neutral-600/30 dark:bg-neutral-300/30` : null
        }`}
      >
        <Link
          draggable={false}
          to={`/post/${notificationInfo.post}`}
          className="flex px-2 py-4 justify-between"
        >
          <p>New comment!</p>
          <p>{icons.comment}</p>
        </Link>
      </li>
    );
  }
  if ('friend_request' in notificationInfo) {
    // if new friend request
    // New friend request pending
    // link to userSearch
    return (
      <li
        className={`border-b-2 border-neutral-900 dark:border-neutral-400 fill-cyan-500 ${
          unread ? `bg-neutral-600/30 dark:bg-neutral-300/30` : null
        }`}
      >
        <Link
          draggable={false}
          to={`/userSearch`}
          className="flex px-2 py-4 justify-between"
        >
          <p>New incoming friend request!</p>
          <p>{icons.frPendingNotification}</p>
        </Link>
      </li>
    );
  }
}
