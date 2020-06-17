import { produce } from "immer"

const initialState = {
   token: localStorage.getItem("token"),
   loading: false,
};

export default (state = initialState, action) => {
   switch (action.type) {
	  case "LOGIN":
	     return produce(state, draft => {
	        draft.loading = true;
		 });
	  case "LOGIN_RESULT":
		 return produce(state, draft => {
			draft.loading = false;
			draft.token = action.payload.token;
		 });
	  case "LOGOUT":
		 return produce(state, draft => {
		    draft.token = null;
		 });
	  default:
		 return state
   }
};
