import {
	CREATE_JOB,
	FETCH_JOB,
	UPDATE_JOB,
	FETCH_EMPLOYEE_JOBS,
	UPDATE_JOB_SETTINGS,
	FETCH_ALL_JOBS,
	APPLY_TO_JOB,
	FETCH_COMPANY_JOBS,
} from "../../types/job";

export const createJobAction = (job) => ({
	type: CREATE_JOB,
	payload: {
		job
	}
})

export const fetchAllJobsAction = () => ({
	type: FETCH_ALL_JOBS
})

export const updateJobAction = (job) => ({
	type: UPDATE_JOB,
	payload: {
		job
	}
})

export const fetchJobAction = (jobId) => ({
	type: FETCH_JOB,
	payload: {
		id: jobId
	}
})

export const fetchEmployeeJobsAction = () => ({
	type: FETCH_EMPLOYEE_JOBS,
})

export const fetchCompanyJobsAction = (companyId) => ({
	type: FETCH_COMPANY_JOBS,
	payload: {
		companyId
	}
})

/**
 * @description to update job's published and auto renew field value
 * @param jobSettings
 * @return {{payload: {settings: *}, type: *}}
 */
export const updateJobSettingsAction = (jobSettings) => ({
	type: UPDATE_JOB_SETTINGS,
	payload: {
		settings: jobSettings
	}
})

export const applyToJobAction = (data) => ({
	type: APPLY_TO_JOB,
	payload: {
		applyJob: data
	}
})
