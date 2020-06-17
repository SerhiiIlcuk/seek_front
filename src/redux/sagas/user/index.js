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
   FETCH_USER, UPDATE_USER,
   USER_RESULT
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
	  console.log('success', data);
   } catch (e) {
	  console.log('error', e);
   }
}

export default actionWatcher;
