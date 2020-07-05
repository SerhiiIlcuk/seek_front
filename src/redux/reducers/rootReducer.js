// import external modules
import { combineReducers } from "redux";
// import chatReducer from "./chatReducer";
import customizer from "./customizer/";
import auth from "./auth";
import user from "./user";
import company from "./company";
import job from "./job";
import common from "./common";
import news from "./news";

import { reducer as toastrReducer } from "react-redux-toastr";

const rootReducer = combineReducers({
   toastr: toastrReducer, // <- Mounted at toastr.
   customizer: customizer,
   auth: auth,
   user: user,
   company: company,
   job: job,
   common: common,
   news: news,
});

export default rootReducer;
