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
	fetchAllNews,
} from "../../../http/http-calls";
import {types} from "../../types/news";
import {SUBMIT_START, SUBMIT_END} from "../../types/common";
import {extractErrorMessage} from "../../../common/errorInterceptor";

function* actionWatcher() {
	yield takeLatest(types.CREATE_NEWS, createNewsSaga);
	yield takeLatest(types.FETCH_ALL_NEWS, fetchAllNewsSaga);
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

function* fetchAllNewsSaga() {
	try {
		const allNews = yield call(fetchAllNews);
		yield put({
			type: types.ALL_NEWS_RESULT,
			payload: allNews,
		});
		console.log(allNews);
	} catch (e) {
		console.log(e);
	}
}

export default actionWatcher;
