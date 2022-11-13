exports.fetchUserInformation = async function (user_id) {
  const link = user_id
    ? `${process.env.REACT_APP_APILINK}/users/${user_id}`
    : `${process.env.REACT_APP_APILINK}/user`;
  const response = await fetch(link, {
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
};

exports.fetchUserPosts = async function (user_id) {
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
};

exports.fetchTimeline = async function (user_id) {
  const response = await fetch(`${process.env.REACT_APP_APILINK}/timeline`, {
    mode: 'cors',
    headers: new Headers({
      Authorization: localStorage.Authorization,
    }),
  });
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    return { timeline: json, response };
  } else {
    return { response };
  }
};

exports.fetchPutLike = async function (post) {
  const link = post.comment_text
    ? `${process.env.REACT_APP_APILINK}/post/comment/${post._id}/like`
    : `${process.env.REACT_APP_APILINK}/post/${post._id}/like`;
  const response = await fetch(link, {
    mode: 'cors',
    method: 'PUT',
    headers: new Headers({
      Authorization: localStorage.Authorization,
    }),
  });
  if (response.status === 200) {
    return await response.json(); //extract JSON from the http response
  }
};

exports.fetchImage = async function (userInformation, setUserInformation) {
  if (!userInformation) return;
  fetch(`${process.env.REACT_APP_APILINK}/img/${await userInformation._id}`)
    //                         vvvv
    .then((response) => response.blob())
    .then((imageBlob) => {
      // Then create a local URL for that image and print it
      const imageObjectURL = URL.createObjectURL(imageBlob);
      const clone = structuredClone(userInformation);
      clone.profile_picture = imageObjectURL;
      setUserInformation(clone);
    });
};
