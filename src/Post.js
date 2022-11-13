import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from './components/Nav';
import PostList from './components/PostList';
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
      <ul className="bg-gradient-to-br from-yellow-200 to-pink-300 h-screen dark:from-indigo-600 dark:to-green-600">
        {postInformation ? (
          <PostList post={postInformation} user={signedUserInfo} />
        ) : null}
        {postInformation
          ? postInformation.replies.map((post) => (
              <PostList key={post._id} post={post} user={signedUserInfo} />
            ))
          : null}
      </ul>
      <Nav timeline={true} />
    </div>
  );
}
