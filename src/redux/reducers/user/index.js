import { produce } from "immer"
import {USER_RESULT} from "../../types/user";

const initialState = {
   userData: undefined
};

export default (state = initialState, action) => {
   switch (action.type) {
	  case USER_RESULT:
		 return produce(state, draft => {
			draft.userData = action.payload;
		 });
	  default:
		 return state
   }
};
