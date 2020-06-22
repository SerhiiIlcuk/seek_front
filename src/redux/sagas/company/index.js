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
import {
   FETCH_COMPANY,
   COMPANY_RESULT,
   CREATE_COMPANY,
   SUBMIT_END,
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

function* actionWatcher() {
   yield takeLatest(CREATE_COMPANY, createCompanySaga);
   yield takeLatest(UPDATE_COMPANY, updateCompanySaga);
   yield takeLatest(UPDATE_EMPLOYEE, updateEmployeeSaga);
   yield takeLatest(DELETE_EMPLOYEE, deleteEmployeeSaga);
   yield takeLatest(FETCH_COMPANY, fetchCompanySaga);
   yield takeLatest(FETCH_ALL_COMPANIES, fetchAllCompaniesSaga);
   yield takeLatest(IMAGE_UPLOAD, uploadImageSaga);
   yield takeLatest(FETCH_ALL_COMPANY_TYPES,fetchAllCompanyTypesSaga);
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

function* fetchAllCompaniesSaga() {
   try {
	  const data = yield call(fetchAllCompanies);
	  yield put({
		 type: ALL_COMPANIES_RESULT,
		 payload: data
	  });
   } catch (e) {
	  console.log('error', e);
   }
}

function* uploadImageSaga({payload}) {
   try {
	  yield call(uploadImage, payload);
   } catch (e) {
	  console.log('error', e);
   }
}

function* updateEmployeeSaga({payload: {companyEmployee}}) {
   try {
	  const data = yield call(updateEmployee, companyEmployee);

	  if (data) {
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
	  }
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

function* deleteEmployeeSaga({payload: {companyEmployee}}) {
   try {
	  const data = yield call(deleteEmployee, companyEmployee);

	  if (data) {
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
	  }
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

function* fetchAllCompanyTypesSaga() {
   try {
	  const companyTypes = yield call(fetchAllCompanyTypes);

	  yield put({
		 type: ALL_COMPANY_TYPES_RESULT,
		 payload: companyTypes
	  });
   } catch (e) {
	  console.log('error', e);
   }
}

export default actionWatcher;
