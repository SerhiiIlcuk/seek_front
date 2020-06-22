import {
   CREATE_JOB,
   FETCH_JOB,
   UPDATE_JOB,
   FETCH_EMPLOYEE_JOBS,
   UPDATE_JOB_SETTINGS,
} from "../../types/job";

export const createJobAction = (job) => ({
   type: CREATE_JOB,
   payload: {
      job
   }
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
