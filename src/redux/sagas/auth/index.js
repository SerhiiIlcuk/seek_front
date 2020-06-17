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
import {REGISTER} from "../../types/auth";

function* actionWatcher() {
   yield takeLatest('LOGIN', loginSaga);
   yield takeLatest(REGISTER, registerSaga);
}

function* registerSaga({payload: {email, password, userType}}) {
   try {
	  const res = yield call(register, {
		 email,
		 password,
		 userType
	  });
	  console.log('success', res);
   } catch (e) {
	  console.log('error', e);
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
		    token: res.accessToken
		 }
	  });

	  localStorage.setItem("token", res.accessToken);
	  localStorage.setItem("refreshToken", res.refreshToken);
   } catch (e) {
	  console.log('error', e);
   }
}

export default actionWatcher;
