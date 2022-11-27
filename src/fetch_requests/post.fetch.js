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

exports.fetchPutPost = async function (post_id, post_text, image) {
  if (post_text.length === 0) return;

  var formData = new FormData();
  if (image) {
    if (typeof image === 'string') {
      formData.append('image_url', image);
    } else {
      formData.append('image', image, image.name);
    }
  }

  formData.append('post_text', post_text.trim());
  const response = await fetch(
    `${process.env.REACT_APP_APILINK}/post/${post_id}`,
    {
      mode: 'cors',
      method: 'PUT',
      body: formData,
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

exports.fetchPutComment = async function (comment_id, comment_text, image) {
  if (comment_text.length === 0) return;
  var formData = new FormData();
  if (image) {
    if (typeof image === 'string') {
      formData.append('image_url', image);
    } else {
      formData.append('image', image, image.name);
    }
  }
  formData.append('comment_text', comment_text.trim());
  const response = await fetch(
    `${process.env.REACT_APP_APILINK}/post/comment/${comment_id}`,
    {
      mode: 'cors',
      method: 'PUT',
      body: formData,
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

exports.fetchPostPost = async function (post_text, image) {
  if (post_text.length === 0) return;
  var formData = new FormData();
  if (image) {
    if (typeof image === 'string') {
      formData.append('image_url', image);
    } else {
      formData.append('image', image, image.name);
    }
  }
  formData.append('post_text', post_text.trim());
  const response = await fetch(`${process.env.REACT_APP_APILINK}/post/`, {
    mode: 'cors',
    method: 'POST',
    body: formData,
    headers: new Headers({
      Authorization: localStorage.Authorization,
    }),
  });
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    return { post: json, response };
  } else {
    return { response };
  }
};

exports.fetchPostComment = async function (comment_text, post_id, image) {
  if (comment_text.length === 0) return;

  var formData = new FormData();
  if (image) {
    if (typeof image === 'string') {
      formData.append('image_url', image);
    } else {
      formData.append('image', image, image.name);
    }
  }

  formData.append('comment_text', comment_text.trim());
  const response = await fetch(
    `${process.env.REACT_APP_APILINK}/post/${post_id}/comment`,
    {
      mode: 'cors',
      method: 'POST',
      body: formData,
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

exports.fetchDeletePost = async function (post_id) {
  let link = `${process.env.REACT_APP_APILINK}/post/${post_id}${window.location.pathname}`;
  const response = await fetch(link, {
    mode: 'cors',
    method: 'DELETE',
    headers: new Headers({
      Authorization: localStorage.Authorization,
    }),
  });
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    return { post: json, response };
  } else {
    return { response };
  }
};

exports.fetchDeleteComment = async function (comment_id) {
  let link = `${process.env.REACT_APP_APILINK}/post/comment/${comment_id}/${
    window.location.pathname.split('/')[1]
  }`;
  const response = await fetch(link, {
    mode: 'cors',
    method: 'DELETE',
    headers: new Headers({
      Authorization: localStorage.Authorization,
    }),
  });
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    return { post: json, response };
  } else {
    return { response };
  }
};
