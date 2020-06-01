export const getToken = () => {
  return new Promise((resolve, reject) => {
    let token = null;
    if (localStorage.ma13AdminToken) {
      token = localStorage.ma13AdminToken;
    }
    resolve(token);
  });
};