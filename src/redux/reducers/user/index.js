import { produce } from "immer"
import {
   USER_RESULT,
   UPDATE_USER, UPDATE_USER_END, USER_COMPANY,
} from "../../types/user";

const initialState = {
   success: false,
   submitting: false,
   userData: undefined,
   userCompany: JSON.parse(localStorage.getItem('userCompany')),
};

export default (state = initialState, action) => {
   switch (action.type) {
	  case USER_RESULT:
		 return produce(state, draft => {
			draft.userData = action.payload;
		 });
	  case USER_COMPANY:
		 return produce(state, draft => {
			localStorage.setItem("userCompany", null);
		    const userId = action.payload.id;
		    const company = action.payload.company;
		    if (company) {
		       const me = company.employees &&
			   company.employees.find(employee => employee.user === userId);
			   draft.userCompany = {
			      id: company._id,
				  roles: me.roles
			   };
			   localStorage.setItem('userCompany', JSON.stringify(draft.userCompany));
			}
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
