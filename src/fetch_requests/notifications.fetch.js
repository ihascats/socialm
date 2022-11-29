exports.fetchNotifications = async function () {
  const link = `${process.env.REACT_APP_APILINK}/notifications`;
  const response = await fetch(link, {
    mode: 'cors',
    headers: new Headers({
      Authorization: localStorage.Authorization,
    }),
  });
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    return { notifications: json, response };
  } else {
    return { response };
  }
};
