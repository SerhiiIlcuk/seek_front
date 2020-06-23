import {
   FETCH_ALL_JOB_LOCATIONS,
   FETCH_ALL_PROFESSIONS,
   FETCH_ALL_SKILLS,
   FETCH_ALL_JOB_CATEGORIES,
} from "../../types/common";


export const fetchAllSkillsAction = () => ({
   type: FETCH_ALL_SKILLS,
})

export const fetchAllJobLocationsAction = () => ({
   type: FETCH_ALL_JOB_LOCATIONS,
})

export const fetchAllProfessionsAction = () => ({
   type: FETCH_ALL_PROFESSIONS,
})

export const fetchAllJobCategoriesAction = () => ({
   type: FETCH_ALL_JOB_CATEGORIES,
})
