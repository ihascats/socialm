export function isLocalStorageMobile() {
  if (localStorage.mobile === 'true') {
    return true;
  }
  if (localStorage.mobile === 'false') {
    return false;
  }
  return window.innerWidth <= 768;
}

export function screenWidth(event, setMobile) {
  const isMobile = event.target.innerWidth <= 768;
  setMobile(isMobile);
  localStorage.mobile = isMobile;
}
