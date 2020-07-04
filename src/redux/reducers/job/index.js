import {produce} from "immer";
import {
	ALL_JOBS_RESULT,
	COMPANY_JOBS_RESULT,
	CREATE_JOB,
	EMPLOYEE_JOBS_RESULT,
	JOB_RESULT,
	UPDATE_JOB
} from "../../types/job";

const initialState = {
	success: false,
	submitting: false,
	errMessage: null,
	employeeJobs: null,
	job: null, // job record used when edit job
	allJobs: null,
	companyJobs: undefined,
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
		case ALL_JOBS_RESULT:
			return produce(state, draft => {
				draft.allJobs = action.payload.allJobs;
			});
		case EMPLOYEE_JOBS_RESULT:
			return produce(state, draft => {
				draft.employeeJobs = action.payload.jobs;
			});
		case COMPANY_JOBS_RESULT:
			return produce(state, draft => {
				draft.companyJobs = action.payload.companyJobs;
			});
		default:
			return state
	}
};
