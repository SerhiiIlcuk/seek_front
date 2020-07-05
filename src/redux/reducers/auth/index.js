import { produce } from "immer"

const initialState = {
   token: localStorage.getItem("token"),
   userType: localStorage.getItem("userType"),
   submitting: false,
   success: false,
   errMessage: null
};

export default (state = initialState, action) => {
   switch (action.type) {
	  case "LOGIN_RESULT":
		 return produce(state, draft => {
			draft.token = action.payload.token;
			draft.userType = action.payload.userType;
		 });
	  case "LOGOUT":
		 return produce(state, draft => {
		    draft.token = null;
		    draft.userType = null;
		 });
	  default:
		 return state
   }
};
