import {
   takeEvery,
   takeLatest,
   take,
   put,
   race,
   call,
   select,
} from "redux-saga/effects";
import {
   createJob,
   updateJob,
   fetchJob,
   fetchAllJobs,
   fetchEmployeeJobs,
   updateJobSettings,
} from "../../../http/http-calls";
import {
   CREATE_JOB,
   EMPLOYEE_JOBS_RESULT,
   FETCH_EMPLOYEE_JOBS,
   FETCH_JOB,
   UPDATE_JOB,
   UPDATE_JOB_SETTINGS,
   JOB_RESULT, FETCH_ALL_JOBS,
   ALL_JOBS_RESULT,
} from "../../types/job";
import {SUBMIT_END} from "../../types/common";
import {getEmployeeJobs} from "../../selectors/job";

function* actionWatcher() {
   yield takeLatest(CREATE_JOB, createJobSaga);
   yield takeLatest(FETCH_JOB, fetchJobSaga);
   yield takeLatest(FETCH_ALL_JOBS, fetchAllJobsSaga);
   yield takeLatest(UPDATE_JOB, updateJobSaga);
   yield takeLatest(FETCH_EMPLOYEE_JOBS, fetchEmployeeJobSaga);
   yield takeLatest(UPDATE_JOB_SETTINGS, updateJobSettingsSaga);
}

function* createJobSaga({payload: {job}}) {
   try {
	  yield call(createJob, job);
	  yield put({
		 type: SUBMIT_END,
		 payload: {
			success: true,
		 }
	  })
   } catch (e) {
	  console.log('error', e);
	  yield put({
		 type: SUBMIT_END,
		 payload: {
			success: false,
			errMessage: e.message
		 }
	  })
   }
}

function* updateJobSaga({payload: {job}}) {
   try {
	  yield call(updateJob, job);
	  yield put({
		 type: SUBMIT_END,
		 payload: {
			success: true,
		 }
	  })
   } catch (e) {
	  console.log('error', e);
	  yield put({
		 type: SUBMIT_END,
		 payload: {
			success: false,
			errMessage: e.message
		 }
	  })
   }
}

function* fetchJobSaga({payload: {id}}) {
   try {
	  const job = yield call(fetchJob, id);

	  yield put({
		 type: JOB_RESULT,
		 payload: {
		    job,
		 }
	  })

	  yield put({
		 type: SUBMIT_END,
		 payload: {
			success: true,
		 }
	  })
   } catch (e) {
	  console.log('error', e);
	  yield put({
		 type: SUBMIT_END,
		 payload: {
			success: false,
			errMessage: e.message
		 }
	  })
   }
}

function* fetchAllJobsSaga() {
   try {
	  const jobs = yield call(fetchAllJobs);

	  yield put({
		 type: ALL_JOBS_RESULT,
		 payload: {
		    allJobs: jobs,
		 }
	  })

	  yield put({
		 type: SUBMIT_END,
		 payload: {
			success: true,
		 }
	  })
   } catch (e) {
	  console.log('error', e);
	  yield put({
		 type: SUBMIT_END,
		 payload: {
			success: false,
			errMessage: e.message
		 }
	  })
   }
}

function* fetchEmployeeJobSaga() {
   try {
      const jobs = yield call(fetchEmployeeJobs);

      yield put({
		 type: EMPLOYEE_JOBS_RESULT,
		 payload: {
		    jobs: jobs
		 }
	  })

	  yield put({
		 type: SUBMIT_END,
		 payload: {
			success: true,
		 }
	  })
   } catch (e) {
	  console.log('error', e);
	  yield put({
		 type: SUBMIT_END,
		 payload: {
			success: false,
			errMessage: e.message
		 }
	  })
   }
}

function* updateJobSettingsSaga({payload: {settings}}) {
   try {
      const state = yield select();
	  const updatedJob = yield call(updateJobSettings, settings);
	  const employeeJobs = getEmployeeJobs(state);
	  let data = employeeJobs && JSON.parse(JSON.stringify(employeeJobs));
	  const index = employeeJobs && employeeJobs.findIndex(job => job._id === updatedJob._id);

	  data.splice(index, 1, updatedJob);

	  yield put({
		 type: EMPLOYEE_JOBS_RESULT,
		 payload: {
			jobs: data
		 }
	  })

	  yield put({
		 type: SUBMIT_END,
		 payload: {
			success: true,
		 }
	  })
   } catch (e) {
	  console.log('error', e);
	  yield put({
		 type: SUBMIT_END,
		 payload: {
			success: false,
			errMessage: e.message
		 }
	  })
   }
}

export default actionWatcher;
