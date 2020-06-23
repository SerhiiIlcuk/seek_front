import get from "lodash/get"

export const getAllSkills = (state) => {
   return get(state, "common.allSkills");
};

export const getAllJobLocations = (state) => {
   return get(state, "common.allJobLocations");
};

export const getAllProfessions = (state) => {
   return get(state, "common.allProfessions");
};

export const getAllJobCategories = (state) => {
   return get(state, "common.allJobCategories");
};
