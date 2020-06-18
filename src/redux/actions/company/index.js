import {
   CREATE_COMPANY,
   FETCH_COMPANY, IMAGE_UPLOAD, UPDATE_COMPANY,
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

export const uploadImageAction = (base64) => ({
   type: IMAGE_UPLOAD,
   payload: {
      base64
   }
})
