import get from "lodash/get"

export const getToken = (state) => {
   return get(state, "auth.token");
};

export const getUserType = (state) => {
   return get(state, "auth.userType");
};

export const getSubmitting = (state) => {
   return get(state, "auth.submitting");
};

export const getSuccess = (state) => {
   return get(state, "auth.success");
};

export const getErrMessage = (state) => {
   return get(state, "auth.errMessage");
};
