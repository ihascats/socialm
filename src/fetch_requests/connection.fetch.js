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
    if (localStorage.connected === 'true') {
      setConnected(true);
      return;
    }
    const response = await checkConnection();
    if (response.connected === true) {
      localStorage.connected = true;
      setConnected(true);
      if (localStorage.Authorization) {
        window.onunload = () => {
          localStorage.removeItem('connected');
        };
      } else {
        const currentUrl = window.location.pathname;
        const signInUrl = `${process.env.PUBLIC_URL}/signIn`;
        if (currentUrl !== signInUrl) navigate(signInUrl, { replace: true });
        window.onunload = () => {
          localStorage.removeItem('connected');
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
}
