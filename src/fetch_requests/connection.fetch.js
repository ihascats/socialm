export const checkConnection = async function () {
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

export async function checkConnectionAndNavigate(setConnected, navigate) {
  try {
    const response = await checkConnection();
    if (response.connected === true) {
      localStorage.connected = true;
      setConnected(true);
      if (localStorage.Authorization) {
        window.onunload = () => {
          localStorage.removeItem('connected');
        };
      } else {
        navigate(`${process.env.PUBLIC_URL}/signIn`, { replace: true });
        window.onunload = () => {
          localStorage.removeItem('connected');
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
}
