import get from "lodash/get"

export const getSubmitting = (state) => {
   return get(state, "job.submitting");
};

export const getSuccess = (state) => {
   return get(state, "job.success");
};

export const getErrMessage = (state) => {
   return get(state, "job.errMessage");
};
