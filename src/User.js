import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from './components/Nav';
import PostList from './components/PostList';
import UserHeader from './components/UserHeader';
import { fetchUserInformation, fetchUserPosts } from './fetch_requests';

export default function User() {
  const [userInformation, setUserInformation] = useState();
  const [userPosts, setUserPosts] = useState();
  const [showPosts, setShowPosts] = useState(true);
  const { id } = useParams();

  function update() {
    fetchUserInformation(id).then(
      function (value) {
        if (value.response.status === 200) {
          setUserInformation(value.user);
          fetchUserPosts(value.user._id).then(
            function (value) {
              if (value.response.status === 200) {
                setUserPosts(value.posts_comments);
              }
            },
            function (error) {
              console.log(error);
            },
          );
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }

  useEffect(() => {
    update();
  }, []);

  return (
    <div className="dark:text-neutral-50 dark:bg-neutral-900">
      {userInformation ? (
        <UserHeader userInformation={userInformation} />
      ) : null}
      {userPosts ? (
        <div>
          <button
            onClick={() => {
              setShowPosts(true);
              update();
            }}
            className="w-1/2 border-b-2 border-neutral-900 dark:border-lime-300 py-2"
          >
            Posts
          </button>
          <button
            onClick={() => {
              setShowPosts(false);
              update();
            }}
            className="w-1/2 border-b-2 border-neutral-900 dark:border-lime-300 py-2"
          >
            Comments
          </button>
          <ul className="bg-gradient-to-br from-yellow-200 to-pink-300 min-h-screen dark:from-indigo-600 dark:to-green-600">
            {showPosts
              ? userPosts.posts.map((post) => (
                  <PostList key={post._id} post={post} user={userInformation} />
                ))
              : userPosts.comments.map((post) => (
                  <PostList key={post._id} post={post} user={userInformation} />
                ))}
          </ul>
        </div>
      ) : null}

      <Nav timeline={true} />
    </div>
  );
}
