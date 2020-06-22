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
   login,
   register
} from "../../../http/http-calls";
import {
   REGISTER,
   SUBMIT_END
} from "../../types/auth";
import {USER_COMPANY} from "../../types/user";

function* actionWatcher() {
   yield takeLatest('LOGIN', loginSaga);
   yield takeLatest(REGISTER, registerSaga);
}

function* registerSaga({payload: {email, password, userType}}) {
   try {
	  yield call(register, {
		 email,
		 password,
		 userType
	  });

	  yield put({
		 type: SUBMIT_END,
		 payload: {
		    success: true,
			errMessage: null
		 }
	  });
   } catch (e) {
	  yield put({
		 type: SUBMIT_END,
		 payload: {
			success: false,
			errMessage: e.message
		 }
	  });
	  console.log('error', e.message);
   }
}

function* loginSaga({payload: {email, password}}) {
   try {
	  const res = yield call(login, {
		 email,
		 password
	  });

	  yield put({
		 type: 'LOGIN_RESULT',
		 payload: {
		    token: res.accessToken,
			userType: res.userType
		 }
	  });
	  yield put({
		 type: USER_COMPANY,
		 payload: {
		    id: res.id,
		    company: res.company
		 }
	  });
	  yield put({
		 type: SUBMIT_END,
		 payload: {
			success: true,
		 }
	  });

	  localStorage.setItem("userType", res.userType);
	  localStorage.setItem("token", res.accessToken);
	  localStorage.setItem("refreshToken", res.refreshToken);
   } catch (e) {
	  yield put({
		 type: SUBMIT_END,
		 payload: {
			success: false,
			errMessage: e.message
		 }
	  });
	  console.log('error', e);
   }
}

export default actionWatcher;
