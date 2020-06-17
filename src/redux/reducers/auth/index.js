import { produce } from "immer"
import {
   REGISTER,
   SUBMIT_END
} from "../../types/auth";

const initialState = {
   token: localStorage.getItem("token"),
   userType: localStorage.getItem("userType"),
   submitting: false,
   success: false,
   errMessage: null
};

export default (state = initialState, action) => {
   switch (action.type) {
	  case "LOGIN":
	     return produce(state, draft => {
	        draft.submitting = true;
		 });
	  case "LOGIN_RESULT":
		 return produce(state, draft => {
			draft.token = action.payload.token;
			draft.userType = action.payload.userType;
		 });
	  case "LOGOUT":
		 return produce(state, draft => {
		    draft.token = null;
		 });
	  case REGISTER:
		 return produce(state, draft => {
			draft.submitting = true;
		 });
	  case SUBMIT_END:
		 return produce(state, draft => {
			draft.submitting = false;
			draft.success = action.payload.success;
			draft.errMessage = action.payload.errMessage;
		 });
	  default:
		 return state
   }
};
