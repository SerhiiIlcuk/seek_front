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
   fetchAllJobCategories,
   fetchAllJobLocations,
   fetchAllProfessions,
   fetchAllSkills,
} from "../../../http/http-calls";
import {
   FETCH_ALL_JOB_LOCATIONS,
   FETCH_ALL_SKILLS,
   FETCH_ALL_PROFESSIONS,
   FETCH_ALL_JOB_CATEGORIES,
   ALL_JOB_LOCATIONS_RESULT,
   ALL_SKILLS_RESULT,
   ALL_PROFESSIONS_RESULT,
   ALL_JOB_CATEGORIES_RESULT,
   SUBMIT_START,
   SUBMIT_END,
} from "../../types/common";
import {extractErrorMessage} from "../../../common/errorInterceptor";

function* actionWatcher() {
   yield takeLatest(FETCH_ALL_SKILLS,fetchAllSkillsSaga);
   yield takeLatest(FETCH_ALL_PROFESSIONS,fetchAllProfessionsSaga);
   yield takeLatest(FETCH_ALL_JOB_LOCATIONS,fetchAllJobLocationsSaga);
   yield takeLatest(FETCH_ALL_JOB_CATEGORIES,fetchAllJobCategoriesSaga);
}

function* fetchAllSkillsSaga() {
   try {
	  /*yield put({
		 type: SUBMIT_START,
	  });*/

	  const allSkills = yield call(fetchAllSkills);

	  yield put({
		 type: ALL_SKILLS_RESULT,
		 payload: allSkills
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

function* fetchAllProfessionsSaga() {
   try {
	  /*yield put({
		 type: SUBMIT_START,
	  });*/

	  const allProfessions = yield call(fetchAllProfessions);

	  yield put({
		 type: ALL_PROFESSIONS_RESULT,
		 payload: allProfessions
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

function* fetchAllJobLocationsSaga() {
   try {
	  /*yield put({
		 type: SUBMIT_START,
	  });*/

	  const allJobLocations = yield call(fetchAllJobLocations);

	  yield put({
		 type: ALL_JOB_LOCATIONS_RESULT,
		 payload: allJobLocations
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

function* fetchAllJobCategoriesSaga() {
   try {
	  /*yield put({
		 type: SUBMIT_START,
	  });*/

	  const allJobCategories = yield call(fetchAllJobCategories);

	  yield put({
		 type: ALL_JOB_CATEGORIES_RESULT,
		 payload: allJobCategories
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
