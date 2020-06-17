import get from "lodash/get"

export const getUserData = (state) => {
   return get(state, "user.userData");
};
