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
   uploadImage,
   updateEmployee,
   deleteEmployee,
   fetchAllCompanies,
   fetchAllCompanyTypes,
} from "../../../http/http-calls";
import {extractErrorMessage} from "../../../common/errorInterceptor";
import {
   FETCH_COMPANY,
   COMPANY_RESULT,
   CREATE_COMPANY,
   UPDATE_COMPANY,
   IMAGE_UPLOAD,
   UPDATE_EMPLOYEE,
   DELETE_EMPLOYEE,
   FETCH_ALL_COMPANIES,
   ALL_COMPANIES_RESULT,
   FETCH_ALL_COMPANY_TYPES,
   ALL_COMPANY_TYPES_RESULT,
} from "../../types/company";
import {getUserCompany} from "../../selectors/user";
import {SUBMIT_START, SUBMIT_END} from "../../types/common";

function* actionWatcher() {
   yield takeLatest(CREATE_COMPANY, createCompanySaga);
   yield takeLatest(UPDATE_COMPANY, updateCompanySaga);
   yield takeLatest(UPDATE_EMPLOYEE, updateEmployeeSaga);
   yield takeLatest(DELETE_EMPLOYEE, deleteEmployeeSaga);
   yield takeLatest(FETCH_COMPANY, fetchCompanySaga);
   yield takeLatest(FETCH_ALL_COMPANIES, fetchAllCompaniesSaga);
   yield takeLatest(IMAGE_UPLOAD, uploadImageSaga);
   yield takeLatest(FETCH_ALL_COMPANY_TYPES, fetchAllCompanyTypesSaga);
}

function* createCompanySaga({payload: {company}}) {
   try {
	  yield put({
		 type: SUBMIT_START,
	  });

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
			errMessage: extractErrorMessage(e.message)
		 }
	  });
   }
}

function* updateCompanySaga({payload: {company, companyId}}) {
   try {
	  yield put({
		 type: SUBMIT_START,
	  });

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

function* fetchCompanySaga() {
   try {
	  /*yield put({
		 type: SUBMIT_START,
	  });*/

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

function* fetchAllCompaniesSaga() {
   try {
	  /*yield put({
		 type: SUBMIT_START,
	  });*/

	  const data = yield call(fetchAllCompanies);
	  yield put({
		 type: ALL_COMPANIES_RESULT,
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

function* uploadImageSaga({payload}) {
   try {
	  yield put({
		 type: SUBMIT_START,
	  });

	  yield call(uploadImage, payload);

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

function* updateEmployeeSaga({payload: {companyEmployee}}) {
   try {
	  yield put({
		 type: SUBMIT_START,
	  });

	  const data = yield call(updateEmployee, companyEmployee);

	  if (data) {
		 yield put({
			type: COMPANY_RESULT,
			payload: data
		 });

		 yield put({
			type: SUBMIT_END,
			success: true,
		 });
	  }
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

function* deleteEmployeeSaga({payload: {companyEmployee}}) {
   try {
	  yield put({
		 type: SUBMIT_START,
	  });

	  const data = yield call(deleteEmployee, companyEmployee);

	  yield put({
		 type: COMPANY_RESULT,
		 payload: data
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

function* fetchAllCompanyTypesSaga() {
   try {
	  /*yield put({
		 type: SUBMIT_START,
	  });*/

	  const companyTypes = yield call(fetchAllCompanyTypes);

	  yield put({
		 type: ALL_COMPANY_TYPES_RESULT,
		 payload: companyTypes
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

export default actionWatcher;
