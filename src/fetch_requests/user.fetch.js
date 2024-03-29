export const fetchUserInformation = async function (navigate, user_id) {
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
    const currentUrl = window.location.pathname;
    const signInUrl = `${process.env.PUBLIC_URL}/signIn`;
    if (currentUrl !== signInUrl) navigate(signInUrl, { replace: true });
    localStorage.removeItem('Authorization');
    return { response };
  }
};

export const fetchPutFriendRequest = async function (id) {
  const link = `${process.env.REACT_APP_APILINK}/user/${id}/fr`;
  const response = await fetch(link, {
    mode: 'cors',
    method: 'PUT',
    headers: new Headers({
      Authorization: localStorage.Authorization,
    }),
  });
  if (response.status === 200) {
    return response.json(); //extract JSON from the http response
  }
};

export const fetchPutAcceptFr = async function (id) {
  const link = `${process.env.REACT_APP_APILINK}/user/accept_fr/${id}`;
  const response = await fetch(link, {
    mode: 'cors',
    method: 'PUT',
    headers: new Headers({
      Authorization: localStorage.Authorization,
    }),
  });
  if (response.status === 200) {
    return response.json(); //extract JSON from the http response
  }
};

export const fetchPutDeclineFr = async function (id) {
  const link = `${process.env.REACT_APP_APILINK}/user/decline_fr/${id}`;
  const response = await fetch(link, {
    mode: 'cors',
    method: 'PUT',
    headers: new Headers({
      Authorization: localStorage.Authorization,
    }),
  });
  if (response.status === 200) {
    return response.json(); //extract JSON from the http response
  }
};

export const fetchPutRemoveFr = async function (id) {
  const link = `${process.env.REACT_APP_APILINK}/user/remove_fr/${id}`;
  const response = await fetch(link, {
    mode: 'cors',
    method: 'PUT',
    headers: new Headers({
      Authorization: localStorage.Authorization,
    }),
  });
  if (response.status === 200) {
    return response.json(); //extract JSON from the http response
  }
};

export const fetchUsers = async function () {
  const link = `${process.env.REACT_APP_APILINK}/users`;
  const response = await fetch(link, {
    mode: 'cors',
  });
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    return { users: json, response };
  } else {
    return { response };
  }
};

export const fetchOutgoingFr = async function () {
  const link = `${process.env.REACT_APP_APILINK}/user/outgoingFr`;
  const response = await fetch(link, {
    mode: 'cors',
    headers: new Headers({
      Authorization: localStorage.Authorization,
    }),
  });
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    return { users: json, response };
  } else {
    return { response };
  }
};

export const fetchIncomingFr = async function () {
  const link = `${process.env.REACT_APP_APILINK}/user/friend_requests`;
  const response = await fetch(link, {
    mode: 'cors',
    headers: new Headers({
      Authorization: localStorage.Authorization,
    }),
  });
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    return { users: json, response };
  } else {
    return { response };
  }
};

export const fetchPutUserInfo = async function (username, image) {
  if (username.length === 0) return;

  var formData = new FormData();

  formData.append('username', username.trim());

  if (image) {
    if (typeof image === 'string') {
      formData.append('image_url', image);
    } else {
      const formatArray = [
        'jpeg',
        'gif',
        'png',
        'apng',
        'svg',
        'bmp',
        'ico',
        'png',
      ];
      if (formatArray.includes(image.name.split('.').at(-1)))
        formData.append('profile_picture', image, image.name);
    }
  }
  const link = `${process.env.REACT_APP_APILINK}/user`;
  const response = await fetch(link, {
    mode: 'cors',
    method: 'PUT',
    body: formData,
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
