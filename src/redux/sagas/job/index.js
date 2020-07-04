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
	applyToJob,
	fetchCompanyJobs,
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
	APPLY_TO_JOB,
	FETCH_COMPANY_JOBS,
	COMPANY_JOBS_RESULT,
} from "../../types/job";
import {SUBMIT_START, SUBMIT_END} from "../../types/common";
import {getEmployeeJobs, getAllJobs} from "../../selectors/job";
import {extractErrorMessage} from "../../../common/errorInterceptor";

function* actionWatcher() {
	yield takeLatest(CREATE_JOB, createJobSaga);
	yield takeLatest(FETCH_JOB, fetchJobSaga);
	yield takeLatest(FETCH_ALL_JOBS, fetchAllJobsSaga);
	yield takeLatest(UPDATE_JOB, updateJobSaga);
	yield takeLatest(FETCH_EMPLOYEE_JOBS, fetchEmployeeJobsSaga);
	yield takeLatest(UPDATE_JOB_SETTINGS, updateJobSettingsSaga);
	yield takeLatest(APPLY_TO_JOB, applyToJobSaga);
	yield takeLatest(FETCH_COMPANY_JOBS, fetchCompanyJobsSaga);
}

function* createJobSaga({payload: {job}}) {
	try {
		yield put({
			type: SUBMIT_START,
		});

		yield call(createJob, job);

		yield put({
			type: SUBMIT_END,
			payload: {
				success: true,
			}
		});
	} catch (e) {
		console.log('error', e);
		yield put({
			type: SUBMIT_END,
			payload: {
				success: false,
				errMessage: extractErrorMessage(e.message)
			}
		});
	}
}

function* updateJobSaga({payload: {job}}) {
	try {
		yield put({
			type: SUBMIT_START,
		});

		yield call(updateJob, job);

		yield put({
			type: SUBMIT_END,
			payload: {
				success: true,
			}
		});
	} catch (e) {
		console.log('error', e);
		yield put({
			type: SUBMIT_END,
			payload: {
				success: false,
				errMessage: extractErrorMessage(e.message)
			}
		});
	}
}

function* fetchJobSaga({payload: {id}}) {
	try {
		/*yield put({
		 type: SUBMIT_START,
		});*/

		const job = yield call(fetchJob, id);

		yield put({
			type: JOB_RESULT,
			payload: {
				job,
			}
		})

		/*yield put({
		 type: SUBMIT_END,
		 payload: {
			success: true,
		 }
		});*/
	} catch (e) {
		console.log('error', e);
		/*yield put({
		 type: SUBMIT_END,
		 payload: {
			success: false,
			errMessage: extractErrorMessage(e.message)
		 }
		});*/
	}
}

function* fetchAllJobsSaga() {
	try {
		/*yield put({
		 type: SUBMIT_START,
		});*/

		const jobs = yield call(fetchAllJobs);

		yield put({
			type: ALL_JOBS_RESULT,
			payload: {
				allJobs: jobs,
			}
		})

		/*yield put({
		 type: SUBMIT_END,
		 payload: {
			success: true,
		 }
		});*/
	} catch (e) {
		console.log('error', e);
		/*yield put({
		 type: SUBMIT_END,
		 payload: {
			success: false,
			errMessage: extractErrorMessage(e.message)
		 }
		});*/
	}
}

function* fetchEmployeeJobsSaga() {
	try {
		/*yield put({
		 type: SUBMIT_START,
		});*/

		const jobs = yield call(fetchEmployeeJobs);

		yield put({
			type: EMPLOYEE_JOBS_RESULT,
			payload: {
				jobs: jobs
			}
		})

		/*yield put({
		 type: SUBMIT_END,
		 payload: {
			success: true,
		 }
		});*/
	} catch (e) {
		console.log('error', e);
		/*yield put({
		 type: SUBMIT_END,
		 payload: {
			success: false,
			errMessage: extractErrorMessage(e.message)
		 }
		});*/
	}
}

function* fetchCompanyJobsSaga({payload: {companyId}}) {
	try {
		/*yield put({
		 type: SUBMIT_START,
		});*/

		const companyJobs = yield call(fetchCompanyJobs, companyId);

		yield put({
			type: COMPANY_JOBS_RESULT,
			payload: {
				companyJobs
			}
		})

		/*yield put({
		 type: SUBMIT_END,
		 payload: {
			success: true,
		 }
		});*/
	} catch (e) {
		console.log('error', e);
		/*yield put({
		 type: SUBMIT_END,
		 payload: {
			success: false,
			errMessage: extractErrorMessage(e.message)
		 }
		});*/
	}
}

function* updateJobSettingsSaga({payload: {settings}}) {
	try {
		yield put({
			type: SUBMIT_START,
		});

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
		});
	} catch (e) {
		console.log('error', e);
		yield put({
			type: SUBMIT_END,
			payload: {
				success: false,
				errMessage: extractErrorMessage(e.message)
			}
		});
	}
}

function* applyToJobSaga({payload: {applyJob}}) {
	try {
		const state = yield select();
		yield put({
			type: SUBMIT_START,
		});

		const data = yield call(applyToJob, applyJob);
		let allJobs = getAllJobs(state);
		const index = allJobs && allJobs.findIndex(job => job._id === data._id);

		if (index !== -1) {
			let temp = allJobs && JSON.parse(JSON.stringify(allJobs));
			temp && temp.splice(index, 1, data);
			yield put({
				type: ALL_JOBS_RESULT,
				payload: {
					allJobs: temp
				}
			})
		}

		yield put({
			type: SUBMIT_END,
			payload: {
				success: true,
			}
		});
	} catch (e) {
		console.log('error', e);
		yield put({
			type: SUBMIT_END,
			payload: {
				success: false,
				errMessage: extractErrorMessage(e.message)
			}
		});
	}
}

export default actionWatcher;
