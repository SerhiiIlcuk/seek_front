import get from "lodash/get"

export const getEmployeeJobs = (state) => {
   return get(state, "job.employeeJobs");
};

export const getJob = (state) => {
   return get(state, "job.job");
};

export const getAllJobs = (state) => {
   return get(state, "job.allJobs");
};

export const getCompanyJobs = (state) => {
   return get(state, "job.companyJobs");
}
