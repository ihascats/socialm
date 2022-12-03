exports.checkConnection = async function () {
  const response = await fetch(`${process.env.REACT_APP_APILINK}/connection`, {
    mode: 'cors',
  });
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    return { connected: json.connected, response };
  } else {
    return { response };
  }
};
