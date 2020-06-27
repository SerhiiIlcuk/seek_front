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
   getUserDetails,
   updateUser,
} from "../../../http/http-calls";
import {
   FETCH_USER, UPDATE_USER, UPDATE_USER_END,
   USER_RESULT
} from "../../types/user";
import {SUBMIT_START, SUBMIT_END} from "../../types/common";
import {extractErrorMessage} from "../../../common/errorInterceptor";

function* actionWatcher() {
   yield takeLatest(FETCH_USER, fetchUserSaga);
   yield takeLatest(UPDATE_USER, updateUserSaga)
}

function* fetchUserSaga() {
   try {
	  /*yield put({
		 type: SUBMIT_START,
	  });*/

	  const data = yield call(getUserDetails);
	  yield put({
		 type: USER_RESULT,
		 payload: data
	  });

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

function* updateUserSaga({payload}) {
   try {
	  yield put({
		 type: SUBMIT_START,
	  });

	  yield call(updateUser, payload);

	  yield put({
		 type: UPDATE_USER_END,
		 payload: {
			success: true
		 }
	  });

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
