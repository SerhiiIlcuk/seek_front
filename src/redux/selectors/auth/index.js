import get from "lodash/get"

export const getToken = (state) => {
   return get(state, "auth.token");
};
