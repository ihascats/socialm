import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentCard from './components/CommentCard';
import Nav from './components/Nav';
import PostCard from './components/PostCard';
import { fetchPost } from './fetch_requests/post.fetch';
import { fetchUserInformation } from './fetch_requests/user.fetch';

export default function Post() {
  const [postInformation, setPostInformation] = useState();
  const [signedUserInfo, setSignedUserInfo] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetchUserInformation().then(
      function (value) {
        if (value.response.status === 200) {
          setSignedUserInfo(value.user);
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);

  useEffect(() => {
    fetchPost(id).then(
      function (value) {
        if (value.response.status === 200) {
          setPostInformation(value.post);
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);

  return (
    <div>
      <ul className="bg-gradient-to-br from-yellow-200 to-pink-300 min-h-screen-nav dark:from-indigo-600 dark:to-green-600">
        {postInformation ? (
          <PostCard
            post={postInformation}
            user={signedUserInfo}
            setPostInformation={setPostInformation}
            postInformation={postInformation}
          />
        ) : null}
        {postInformation
          ? postInformation.replies
              .reverse()
              .map((comment) => (
                <CommentCard
                  key={comment._id}
                  comment={comment}
                  user={signedUserInfo}
                />
              ))
          : null}
      </ul>
      <Nav
        timeline={true}
        setPostInformation={setPostInformation}
        postId={id}
      />
    </div>
  );
}
