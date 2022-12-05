import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchImage } from '../fetch_requests/img.fetch';

export default function ChatMessage({ signedUserInfo, messageData }) {
  const user = signedUserInfo;
  const [image, setImage] = useState();

  useEffect(() => {
    if (messageData.author._id === user._id) {
      if (user.profile_picture.slice(0, 4) !== 'http') {
        fetchImage(user, setImage);
      } else if (image) {
        setImage();
      }
    } else if (messageData.author.profile_picture.slice(0, 4) !== 'http') {
      fetchImage(messageData.author, setImage);
    }
  }, [messageData.author, user]);

  return (
    <div className="p-2 border-b-2 border-neutral-900 dark:border-neutral-400">
      <div className="flex justify-between">
        <div className="flex items-end gap-2 border-b-2 border-neutral-900 dark:border-neutral-400 pb-2 max-w-full whitespace-nowrap">
          <Link
            to={
              user._id === messageData.author._id
                ? `/user`
                : `/user/${messageData.author._id}`
            }
          >
            {image ? (
              <img
                alt=""
                src={image.profile_picture}
                className="rounded-full w-10 h-10 border-2 border-neutral-900 dark:border-neutral-400"
              ></img>
            ) : (
              <img
                alt=""
                src={messageData.author.profile_picture}
                className="rounded-full w-10 h-10 border-2 border-neutral-900 dark:border-neutral-400"
              ></img>
            )}
          </Link>
          <Link
            to={
              user._id === messageData.author._id
                ? `/user`
                : `/user/${messageData.author._id}`
            }
            className="font-mono overflow-clip text-ellipsis"
          >
            {messageData.author._id === user._id
              ? user.username
              : messageData.author.username}
          </Link>
          {Math.abs(Date.parse(messageData.createdAt) - Date.now()) / 36e5 >
          23 ? (
            <h2 className="text-sm font-bold opacity-60 font-mono whitespace-nowrap">
              {`${new Date(messageData.createdAt)
                .toString()
                .split(' ')[1]
                .trim()} ${new Date(messageData.createdAt)
                .toString()
                .split(' ')[2]
                .trim()}`}
            </h2>
          ) : Math.floor(
              Math.floor(
                Math.abs(
                  (Date.parse(messageData.createdAt) - Date.now()) / 600,
                ) / 60,
              ) / 60,
            ) > 0 ? (
            <h2 className="text-sm font-bold opacity-60 font-mono whitespace-nowrap">
              {`${Math.floor(
                Math.floor(
                  Math.abs(
                    (Date.parse(messageData.createdAt) - Date.now()) / 600,
                  ) / 60,
                ) / 60,
              )}h`}
            </h2>
          ) : Math.floor(
              Math.abs((Date.parse(messageData.createdAt) - Date.now()) / 600) /
                60,
            ) > 0 ? (
            <h2 className="text-sm font-bold opacity-60 font-mono whitespace-nowrap">
              {`${Math.floor(
                Math.abs(
                  (Date.parse(messageData.createdAt) - Date.now()) / 600,
                ) / 60,
              )}m`}
            </h2>
          ) : (
            <h2 className="text-sm font-bold opacity-60 font-mono whitespace-nowrap">
              {`${Math.floor(
                Math.abs(
                  (Date.parse(messageData.createdAt) - Date.now()) / 600,
                ),
              )}s`}
            </h2>
          )}
        </div>
      </div>
      <div className="pt-2">
        <p className="break-words">{messageData.message}</p>
      </div>
    </div>
  );
}
