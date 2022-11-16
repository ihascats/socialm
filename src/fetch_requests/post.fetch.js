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

exports.fetchPost = async function (post_id) {
  const response = await fetch(
    `${process.env.REACT_APP_APILINK}/post/${post_id}`,
    {
      mode: 'cors',
      headers: new Headers({
        Authorization: localStorage.Authorization,
      }),
    },
  );
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    return { post: json, response };
  } else {
    return { response };
  }
};

exports.fetchPutPost = async function (post_id, post_text) {
  var urlencoded = new URLSearchParams();
  urlencoded.append('post_text', post_text);
  const response = await fetch(
    `${process.env.REACT_APP_APILINK}/post/${post_id}`,
    {
      mode: 'cors',
      method: 'PUT',
      body: urlencoded,
      headers: new Headers({
        Authorization: localStorage.Authorization,
      }),
    },
  );
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    return { post: json, response };
  } else {
    return { response };
  }
};

exports.fetchPutComment = async function (comment_id, comment_text) {
  var urlencoded = new URLSearchParams();
  urlencoded.append('comment_text', comment_text);
  const response = await fetch(
    `${process.env.REACT_APP_APILINK}/post/comment/${comment_id}`,
    {
      mode: 'cors',
      method: 'PUT',
      body: urlencoded,
      headers: new Headers({
        Authorization: localStorage.Authorization,
      }),
    },
  );
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    return { comment: json, response };
  } else {
    return { response };
  }
};
