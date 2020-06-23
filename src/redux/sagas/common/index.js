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
   fetchAllJobLocations,
   fetchAllProfessions,
   fetchAllSkills,
} from "../../../http/http-calls";
import {
   FETCH_ALL_JOB_LOCATIONS,
   FETCH_ALL_SKILLS,
   FETCH_ALL_PROFESSIONS,
   ALL_JOB_LOCATIONS_RESULT,
   ALL_SKILLS_RESULT,
   ALL_PROFESSIONS_RESULT,
} from "../../types/common";

function* actionWatcher() {
   yield takeLatest(FETCH_ALL_SKILLS,fetchAllSkillsSaga);
   yield takeLatest(FETCH_ALL_PROFESSIONS,fetchAllProfessionsSaga);
   yield takeLatest(FETCH_ALL_JOB_LOCATIONS,fetchAllJobLocationsSaga);
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

export default actionWatcher;
