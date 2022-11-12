import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import PostList from './components/PostList';
import UserHeader from './components/UserHeader';

export default function User() {
  const [userInformation, setUserInformation] = useState();
  const [userPosts, setUserPosts] = useState();
  const [showPosts, setShowPosts] = useState(true);

  async function fetchUserInformation() {
    const response = await fetch(`${process.env.REACT_APP_APILINK}/user`, {
      mode: 'cors',
      headers: new Headers({
        Authorization: localStorage.Authorization,
      }),
    });
    if (response.status === 200) {
      const json = await response.json(); //extract JSON from the http response
      return { user: json, response };
    } else {
      return { response };
    }
  }

  async function fetchUserPosts(user_id) {
    const response = await fetch(
      `${process.env.REACT_APP_APILINK}/post/user/${user_id}`,
      {
        mode: 'cors',
        headers: new Headers({
          Authorization: localStorage.Authorization,
        }),
      },
    );
    if (response.status === 200) {
      const json = await response.json(); //extract JSON from the http response
      return { posts_comments: json, response };
    } else {
      return { response };
    }
  }

  function update() {
    fetchUserInformation().then(
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
            className="w-1/2 border-b-2 border-neutral-900 dark:border-lime-300"
          >
            Posts
          </button>
          <button
            onClick={() => {
              setShowPosts(false);
              update();
            }}
            className="w-1/2 border-b-2 border-l-2 border-neutral-900 dark:border-lime-300"
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

      <Nav />
    </div>
  );
}
