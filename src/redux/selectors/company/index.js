import get from "lodash/get"

export const getCompany = (state) => {
   return get(state, "company.companyData");
};

export const getSubmitting = (state) => {
   return get(state, "company.submitting");
};

export const getSuccess = (state) => {
   return get(state, "company.success");
};

export const getErrMessage = (state) => {
   return get(state, "company.errMessage");
};
