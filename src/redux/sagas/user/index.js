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
	fetchAllAdmins,
	updateAdmin,
	deleteAdmin,
	addAdmin,
} from "../../../http/http-calls";
import {
	FETCH_USER, UPDATE_USER, UPDATE_USER_END,
	USER_RESULT, FETCH_ALL_ADMINS, ALL_ADMINS_RESULT,
	UPDATE_ADMIN, DELETE_ADMIN, ADD_ADMIN,
} from "../../types/user";
import {SUBMIT_START, SUBMIT_END} from "../../types/common";
import {getAllAdmins} from "../../selectors/user";
import {extractErrorMessage} from "../../../common/errorInterceptor";

function* actionWatcher() {
	yield takeLatest(FETCH_USER, fetchUserSaga);
	yield takeLatest(UPDATE_USER, updateUserSaga);
	yield takeLatest(UPDATE_ADMIN, updateAdminSaga);
	yield takeLatest(DELETE_ADMIN, deleteAdminSaga);
	yield takeLatest(ADD_ADMIN, addAdminSaga);
	yield takeLatest(FETCH_ALL_ADMINS, fetchAllAdminsSaga);
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

function* fetchAllAdminsSaga() {
	try {
		/*yield put({
		 type: SUBMIT_START,
		});*/

		const data = yield call(fetchAllAdmins);
		yield put({
			type: ALL_ADMINS_RESULT,
			payload: data,
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

function* updateAdminSaga({payload}) {
	try {
		const state = yield select();
		const allAdmins = getAllAdmins(state);
		yield put({
			type: SUBMIT_START,
		});

		const updatedAdmin = yield call(updateAdmin, payload);

		const data = allAdmins && JSON.parse(JSON.stringify(allAdmins));
		const index = data && data.findIndex(admin => admin._id === updatedAdmin._id);

		if (index !== -1) {
			data.splice(index, 1, updatedAdmin);
		}

		yield put({
			type: ALL_ADMINS_RESULT,
			payload: data,
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

function* addAdminSaga({payload}) {
	try {
		yield put({
			type: SUBMIT_START,
		});

		const addedAdmin = yield call(addAdmin, payload);
		const state = yield select();
		const allAdmins = getAllAdmins(state);

		let temp = (allAdmins && JSON.parse(JSON.stringify(allAdmins))) || [];
		temp.push(addedAdmin);


		yield put({
			type: ALL_ADMINS_RESULT,
			payload: temp,
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

function* deleteAdminSaga({payload}) {
	try {
		yield put({
			type: SUBMIT_START,
		});

		yield call(deleteAdmin, payload);

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
