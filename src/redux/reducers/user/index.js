import { produce } from "immer"
import {
   USER_RESULT,
   UPDATE_USER, UPDATE_USER_END,
} from "../../types/user";

const initialState = {
   success: false,
   submitting: false,
   userData: undefined
};

export default (state = initialState, action) => {
   switch (action.type) {
	  case USER_RESULT:
		 return produce(state, draft => {
			draft.userData = action.payload;
		 });
	  case UPDATE_USER:
		 return produce(state, draft => {
			draft.submitting = true;
		 });
	  case UPDATE_USER_END:
		 return produce(state, draft => {
			draft.success = action.payload.success;
			draft.submitting = false;
		 });
	  default:
		 return state
   }
};
