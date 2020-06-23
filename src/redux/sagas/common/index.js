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
} from "../../types/common";

function* actionWatcher() {
   yield takeLatest(FETCH_ALL_SKILLS,fetchAllSkillsSaga);
   yield takeLatest(FETCH_ALL_PROFESSIONS,fetchAllProfessionsSaga);
   yield takeLatest(FETCH_ALL_JOB_LOCATIONS,fetchAllJobLocationsSaga);
   yield takeLatest(FETCH_ALL_JOB_CATEGORIES,fetchAllJobCategoriesSaga);
}

function* fetchAllSkillsSaga() {
   try {
	  const allSkills = yield call(fetchAllSkills);

	  yield put({
		 type: ALL_SKILLS_RESULT,
		 payload: allSkills
	  });
   } catch (e) {
	  console.log('error', e);
   }
}

function* fetchAllProfessionsSaga() {
   try {
	  const allProfessions = yield call(fetchAllProfessions);

	  yield put({
		 type: ALL_PROFESSIONS_RESULT,
		 payload: allProfessions
	  });
   } catch (e) {
	  console.log('error', e);
   }
}

function* fetchAllJobLocationsSaga() {
   try {
	  const allJobLocations = yield call(fetchAllJobLocations);

	  yield put({
		 type: ALL_JOB_LOCATIONS_RESULT,
		 payload: allJobLocations
	  });
   } catch (e) {
	  console.log('error', e);
   }
}

function* fetchAllJobCategoriesSaga() {
   try {
	  const allJobCategories = yield call(fetchAllJobCategories);

	  yield put({
		 type: ALL_JOB_CATEGORIES_RESULT,
		 payload: allJobCategories
	  });
   } catch (e) {
	  console.log('error', e);
   }
}

export default actionWatcher;
