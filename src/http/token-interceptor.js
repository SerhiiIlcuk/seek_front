export const getToken = () => {
  return new Promise((resolve, reject) => {
    let token = null;
    if (localStorage.token) {
      token = localStorage.token;
    }
    resolve(token);
  });
};
