import { produce } from "immer"
import {
   ALL_COMPANIES_RESULT, ALL_COMPANY_TYPES_RESULT,
   COMPANY_RESULT, CREATE_COMPANY, UPDATE_COMPANY
} from "../../types/company";

const initialState = {
   success: false,
   submitting: false,
   companyData: null,
   allCompanies: null,
   allCompanyTypes: null,
   errMessage: null,
};

export default (state = initialState, action) => {
   switch (action.type) {
	  case CREATE_COMPANY:
		 return produce(state, draft => {
			draft.submitting = true;
		 });
	  case UPDATE_COMPANY:
		 return produce(state, draft => {
			draft.submitting = true;
		 });
	  case COMPANY_RESULT:
		 return produce(state, draft => {
			draft.companyData = action.payload;
		 });
	  case ALL_COMPANIES_RESULT:
		 return produce(state, draft => {
			draft.allCompanies = action.payload;
		 });
	  case ALL_COMPANY_TYPES_RESULT:
		 return produce(state, draft => {
			draft.allCompanyTypes = action.payload;
		 });
	  default:
		 return state
   }
};
