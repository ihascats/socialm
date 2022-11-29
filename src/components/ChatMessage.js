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
    <div className="p-2 border-b-2 border-neutral-900 dark:border-lime-300">
      <div className="flex justify-between">
        <div className="flex items-end gap-2 border-b-2 border-neutral-900 pb-2 max-w-full">
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
                className="rounded-full w-10 h-10 border-2 border-neutral-900"
              ></img>
            ) : (
              <img
                alt=""
                src={messageData.author.profile_picture}
                className="rounded-full w-10 h-10 border-2 border-neutral-900"
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
              {`${Date(messageData.createdAt).split(' ')[1].trim()} ${Date(
                messageData.createdAt,
              )
                .split(' ')[2]
                .trim()}`}
            </h2>
          ) : (
            <h2 className="text-sm font-bold opacity-60 font-mono whitespace-nowrap">
              {`${Math.floor(
                Math.abs(Date.parse(messageData.createdAt) - Date.now()) / 36e5,
              )}h`}
            </h2>
          )}
        </div>
      </div>
      <div className="pt-2">
        <p>{messageData.message}</p>
      </div>
    </div>
  );
}