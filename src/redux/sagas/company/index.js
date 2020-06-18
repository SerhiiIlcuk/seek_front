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
   createCompany,
   getCompanyDetails,
   updateCompany,
} from "../../../http/http-calls";
import {
   FETCH_COMPANY,
   COMPANY_RESULT, CREATE_COMPANY, SUBMIT_END, UPDATE_COMPANY,
} from "../../types/company";
import {getUserCompany} from "../../selectors/user";

function* actionWatcher() {
   yield takeLatest(CREATE_COMPANY, createCompanySaga);
   yield takeLatest(UPDATE_COMPANY, updateCompanySaga);
   yield takeLatest(FETCH_COMPANY, fetchCompanySaga);
}

function* createCompanySaga({payload: {company}}) {
   try {
	  const data = yield call(createCompany, company);
	  yield put({
		 type: COMPANY_RESULT,
		 payload: data
	  });
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

function* updateCompanySaga({payload: {company, companyId}}) {
   try {
	  const data = yield call(updateCompany, company, companyId);
	  yield put({
		 type: COMPANY_RESULT,
		 payload: data
	  });
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

function* fetchCompanySaga() {
   try {
	  const state = yield select();
	  const userCompany = getUserCompany(state);
	  const companyId = userCompany && userCompany.id;
	  if (companyId) {
		 const data = yield call(getCompanyDetails, companyId);
		 yield put({
			type: COMPANY_RESULT,
			payload: data
		 });
	  }
   } catch (e) {
	  console.log('error', e);
   }
}

export default actionWatcher;
