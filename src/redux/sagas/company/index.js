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
	adminCreateCompany,
	getCompanyDetails,
	updateCompany,
	uploadImage,
	updateEmployee,
	deleteEmployee,
	fetchAllCompanies,
	fetchAllCompanyTypes,
	fetchVerifiedCompanies,
	publishCompany,
	unPublishCompany,
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
	ADMIN_CREATE_COMPANY,
	FETCH_VERIFIED_COMPANIES,
	VERIFIED_COMPANIES_RESULT,
	PUBLISH_COMPANY,
	UN_PUBLISH_COMPANY,
	FETCH_COMPANY_BY_ID,
	COMPANY_DETAIL_RESULT,
} from "../../types/company";
import {getUserCompany} from "../../selectors/user";
import {SUBMIT_START, SUBMIT_END} from "../../types/common";
import {getAllCompanies} from "../../selectors/company";

function* actionWatcher() {
	yield takeLatest(CREATE_COMPANY, createCompanySaga);
	yield takeLatest(ADMIN_CREATE_COMPANY, adminCreateCompanySaga);
	yield takeLatest(UPDATE_COMPANY, updateCompanySaga);
	yield takeLatest(UPDATE_EMPLOYEE, updateEmployeeSaga);
	yield takeLatest(DELETE_EMPLOYEE, deleteEmployeeSaga);
	yield takeLatest(FETCH_COMPANY, fetchCompanySaga);
	yield takeLatest(FETCH_ALL_COMPANIES, fetchAllCompaniesSaga);
	yield takeLatest(FETCH_VERIFIED_COMPANIES, fetchVerifiedCompaniesSaga);
	yield takeLatest(IMAGE_UPLOAD, uploadImageSaga);
	yield takeLatest(FETCH_ALL_COMPANY_TYPES, fetchAllCompanyTypesSaga);
	yield takeLatest(PUBLISH_COMPANY, publishCompanySaga);
	yield takeLatest(UN_PUBLISH_COMPANY, unPublishCompanySaga);
	yield takeLatest(FETCH_COMPANY_BY_ID, fetchCompanyByIdSaga);
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

function* adminCreateCompanySaga({payload: {company}}) {
	try {
		yield put({
			type: SUBMIT_START,
		});

		const data = yield call(adminCreateCompany, company);
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

function* fetchCompanyByIdSaga({payload: {id}}) {
	try {
		const data = yield call(getCompanyDetails, id);
		yield put({
			type: COMPANY_DETAIL_RESULT,
			payload: data
		});
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

function* fetchVerifiedCompaniesSaga() {
	try {
		const data = yield call(fetchVerifiedCompanies);
		yield put({
			type: VERIFIED_COMPANIES_RESULT,
			payload: data
		});
	} catch (e) {
		console.log('error', e);
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

function* publishCompanySaga({payload: {id}}) {
	try {
		const state = yield select();
		const allCompanies = getAllCompanies(state);
		const company = yield call(publishCompany, id);

		const data = allCompanies && JSON.parse(JSON.stringify(allCompanies));
		const index = data && data.findIndex(item => item._id === company._id);

		if (index !== -1) {
			data.splice(index, 1, company);
		}

		yield put({
			type: ALL_COMPANIES_RESULT,
			payload: data,
		});
	} catch (e) {
		console.log(e);
	}
}

function* unPublishCompanySaga({payload: {id}}) {
	try {
		const state = yield select();
		const allCompanies = getAllCompanies(state);
		const company = yield call(unPublishCompany, id);

		const data = allCompanies && JSON.parse(JSON.stringify(allCompanies));
		const index = data && data.findIndex(item => item._id === company._id);

		if (index !== -1) {
			data.splice(index, 1, company);
		}

		yield put({
			type: ALL_COMPANIES_RESULT,
			payload: data,
		});

		console.log(company);
	} catch (e) {
		console.log(e);
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
