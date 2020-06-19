import { produce } from "immer"
import {SUBMIT_END} from "../../types/common";
import {CREATE_JOB} from "../../types/job";

const initialState = {
   success: false,
   submitting: false,
   errMessage: null,
};

export default (state = initialState, action) => {
   switch (action.type) {
	  case CREATE_JOB:
		 return produce(state, draft => {
			draft.submitting = true;
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
