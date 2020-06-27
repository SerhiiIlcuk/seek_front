import get from "lodash/get"

export const getCompany = (state) => {
   return get(state, "company.companyData");
};

export const getAllCompanies = (state) => {
   return get(state, "company.allCompanies");
};

export const getAllCompanyTypes = (state) => {
   return get(state, "company.allCompanyTypes");
};
