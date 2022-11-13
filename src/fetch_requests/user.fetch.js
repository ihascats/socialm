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

exports.fetchPutFriendRequest = async function (id) {
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

exports.fetchPutAcceptFr = async function (id) {
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

exports.fetchPutDeclineFr = async function (id) {
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

exports.fetchPutRemoveFr = async function (id) {
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
