import {
   FETCH_ALL_JOB_LOCATIONS,
   FETCH_ALL_PROFESSIONS,
   FETCH_ALL_SKILLS
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
