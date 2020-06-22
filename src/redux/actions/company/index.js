import {
   CREATE_COMPANY,
   FETCH_COMPANY,
   IMAGE_UPLOAD,
   UPDATE_COMPANY,
   UPDATE_EMPLOYEE,
   DELETE_EMPLOYEE,
   FETCH_ALL_COMPANIES,
} from "../../types/company";

export const createCompanyAction = (company) => ({
   type: CREATE_COMPANY,
   payload: {
      company
   }
})

export const updateCompanyAction = (company, companyId) => ({
   type: UPDATE_COMPANY,
   payload: {
      company,
      companyId
   }
})

export const fetchCompanyAction = () => ({
   type: FETCH_COMPANY
})

export const fetchAllCompaniesAction = () => ({
   type: FETCH_ALL_COMPANIES
})

export const uploadImageAction = (base64) => ({
   type: IMAGE_UPLOAD,
   payload: {
      base64
   }
})

export const updateEmployeeAction = (companyEmployee) => ({
   type: UPDATE_EMPLOYEE,
   payload: {
      companyEmployee
   }
})

export const deleteEmployeeAction = (companyEmployee) => ({
   type: DELETE_EMPLOYEE,
   payload: {
      companyEmployee
   }
})
