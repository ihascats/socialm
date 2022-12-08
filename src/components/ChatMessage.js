import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchImage } from '../fetch_requests/img.fetch';
import Timestamp from './mini-components/Timestamp';

export default function ChatMessage({ signedUserInfo, messageData }) {
  const user = signedUserInfo;
  const [image, setImage] = useState();

  useEffect(() => {
    const { _id: authorId, profile_picture: authorProfilePicture } =
      messageData.author;

    if (authorId === user._id) {
      // If the message was sent by the current user, check their profile picture
      const { profile_picture: userProfilePicture } = user;

      if (userProfilePicture.slice(0, 4) !== 'http') {
        fetchImage(user, setImage);
      } else if (image) {
        setImage();
      }
    } else if (authorProfilePicture.slice(0, 4) !== 'http') {
      // If the message was sent by a different user, check their profile picture
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
          <Timestamp createdAt={messageData.createdAt} />
        </div>
      </div>
      <div className="pt-2">
        <p className="break-words">{messageData.message}</p>
      </div>
    </div>
  );
}
