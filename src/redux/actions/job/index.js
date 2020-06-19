import {
   CREATE_JOB
} from "../../types/job";

export const createJobAction = (job) => ({
   type: CREATE_JOB,
   payload: {
      job
   }
})
