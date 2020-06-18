import { produce } from "immer"
import {
   COMPANY_RESULT, CREATE_COMPANY, SUBMIT_END, UPDATE_COMPANY
} from "../../types/company";

const initialState = {
   success: false,
   submitting: false,
   companyData: null,
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
	  case SUBMIT_END:
		 return produce(state, draft => {
			draft.submitting = false;
			draft.success = action.payload.success;
			draft.errMessage = action.payload.message;
		 });
	  default:
		 return state
   }
};
