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
	updateNews,
	fetchAllNews,
	fetchNews,
	deleteNews,
} from "../../../http/http-calls";
import {types} from "../../types/news";
import {SUBMIT_START, SUBMIT_END} from "../../types/common";
import {extractErrorMessage} from "../../../common/errorInterceptor";
import {getAllNews} from "../../selectors/news";

function* actionWatcher() {
	yield takeLatest(types.CREATE_NEWS, createNewsSaga);
	yield takeLatest(types.UPDATE_NEWS, updateNewsSaga);
	yield takeLatest(types.FETCH_NEWS, fetchNewsSaga);
	yield takeLatest(types.FETCH_ALL_NEWS, fetchAllNewsSaga);
	yield takeLatest(types.DELETE_NEWS, deleteNewsSaga);
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

function* updateNewsSaga({payload: {news}}) {
	try {
		yield put({
			type: SUBMIT_START,
		});

		yield call(updateNews, news);

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

function* fetchNewsSaga({payload: {id}}) {
	try {
		const news = yield call(fetchNews, id);
		yield put({
			type: types.NEWS_RESULT,
			payload: news,
		});
		console.log(news);
	} catch (e) {
		console.log(e);
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

function* deleteNewsSaga({payload: {id}}) {
	try {
		const data = yield call(deleteNews, id);
		const state = yield select();
		const allNews = getAllNews(state);
		let temp = allNews && JSON.parse(JSON.stringify(allNews));
		const index = temp && temp.findIndex(item => item._id === data._id);

		if (index !== -1) {
			temp.splice(index, 1);
		}

		yield put({
			type: types.ALL_NEWS_RESULT,
			payload: temp,
		});
	} catch (e) {
		console.log(e);
	}
}

export default actionWatcher;
