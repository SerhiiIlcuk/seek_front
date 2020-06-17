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
   USER_RESULT, UPDATE_USER_SUCCESS
} from "../../types/user";

function* actionWatcher() {
   yield takeLatest(FETCH_USER, fetchUserSaga);
   yield takeLatest(UPDATE_USER, updateUserSaga)
}

function* fetchUserSaga() {
   try {
	  const data = yield call(getUserDetails);
	  yield put({
		 type: USER_RESULT,
		 payload: data
	  });
   } catch (e) {
	  console.log('error', e);
   }
}

function* updateUserSaga({payload}) {
   try {
	  const data = yield call(updateUser, payload);
	  yield put({
		 type: UPDATE_USER_END,
		 payload: {
			success: true
		 }
	  });
   } catch (e) {
	  console.log('error', e);
	  yield put({
		 type: UPDATE_USER_END,
		 payload: {
			success: false
		 }
	  });
   }
}

export default actionWatcher;
