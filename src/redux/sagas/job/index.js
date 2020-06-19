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
} from "../../../http/http-calls";
import {
   CREATE_JOB,
} from "../../types/job";
import {SUBMIT_END} from "../../types/common";

function* actionWatcher() {
   yield takeLatest(CREATE_JOB, createJobSaga);
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

export default actionWatcher;
