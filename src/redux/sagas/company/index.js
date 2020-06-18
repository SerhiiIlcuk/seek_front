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

} from "../../../http/http-calls";
import {
   FETCH_COMPANY,
   COMPANY_RESULT,
} from "../../types/company";

function* actionWatcher() {
   yield takeLatest(FETCH_COMPANY, fetchCompanySaga);
}

function* fetchCompanySaga() {
   try {
	  const data = yield call();
	  yield put({
		 type: COMPANY_RESULT,
		 payload: data
	  });
   } catch (e) {
	  console.log('error', e);
   }
}

export default actionWatcher;
