export const fetchChat = async function () {
  const link = `${process.env.REACT_APP_APILINK}/chat`;
  const response = await fetch(link, {
    mode: 'cors',
  });
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    return { chat: json, response };
  } else {
    return { response };
  }
};
