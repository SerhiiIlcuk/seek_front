import { produce } from "immer"
import {SUBMIT_END} from "../../types/common";
import {CREATE_JOB, EMPLOYEE_JOBS_RESULT, JOB_RESULT, UPDATE_JOB} from "../../types/job";

const initialState = {
   success: false,
   submitting: false,
   errMessage: null,
   employeeJobs: null,
   job: null, // job record used when edit job
};

export default (state = initialState, action) => {
   switch (action.type) {
	  case CREATE_JOB:
		 return produce(state, draft => {
			draft.submitting = true;
		 });
	  case UPDATE_JOB:
		 return produce(state, draft => {
			draft.submitting = true;
		 });
	  case JOB_RESULT:
		 return produce(state, draft => {
			draft.job = action.payload.job;
		 });
	  case EMPLOYEE_JOBS_RESULT:
		 return produce(state, draft => {
			draft.employeeJobs = action.payload.jobs;
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
