import { produce } from "immer"
import {
   SUBMIT_START,
   SUBMIT_END,
   ALL_JOB_LOCATIONS_RESULT,
   ALL_SKILLS_RESULT,
   ALL_PROFESSIONS_RESULT,
   ALL_JOB_CATEGORIES_RESULT,
} from "../../types/common";

const initialState = {
   success: false,
   submitting: false,
   errMessage: null,
   allJobLocations: null,
   allSkills: null,
   allProfessions: null,
   allJobCategories: null,
};

export default (state = initialState, action) => {
   switch (action.type) {
	  case ALL_PROFESSIONS_RESULT:
		 return produce(state, draft => {
			draft.allProfessions = action.payload;
		 });
	  case ALL_SKILLS_RESULT:
		 return produce(state, draft => {
			draft.allSkills = action.payload;
		 });
	  case ALL_JOB_LOCATIONS_RESULT:
		 return produce(state, draft => {
			draft.allJobLocations = action.payload;
		 });
	  case ALL_JOB_CATEGORIES_RESULT:
		 return produce(state, draft => {
			draft.allJobCategories = action.payload;
		 });
	  case SUBMIT_START:
		 return produce(state, draft => {
			draft.submitting = true;
		 });
	  case SUBMIT_END:
		 return produce(state, draft => {
			draft.submitting = false;
			draft.success = action.payload.success;
			draft.errMessage = action.payload.message;
		 });
	  default:
		 return state
   }
};
