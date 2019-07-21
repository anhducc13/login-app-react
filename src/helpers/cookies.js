// @flow
const getCookieByName = (cname: string) => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

const deleteCookieByName = (cname: string) => {
  document.cookie = `${cname}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export default {
  getByName: getCookieByName,
  deleteByName: deleteCookieByName,
};
