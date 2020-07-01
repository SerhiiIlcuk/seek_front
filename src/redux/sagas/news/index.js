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
	createNews,
} from "../../../http/http-calls";
import {types} from "../../types/news";
import {SUBMIT_START, SUBMIT_END} from "../../types/common";
import {extractErrorMessage} from "../../../common/errorInterceptor";

function* actionWatcher() {
	yield takeLatest(types.CREATE_NEWS, createNewsSaga);
}

function* createNewsSaga({payload: {news}}) {
	try {
		yield put({
			type: SUBMIT_START,
		});

		yield call(createNews, news);

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
