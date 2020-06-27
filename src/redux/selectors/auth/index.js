import get from "lodash/get"

export const getToken = (state) => {
   return get(state, "auth.token");
};

export const getUserType = (state) => {
   return get(state, "auth.userType");
};
