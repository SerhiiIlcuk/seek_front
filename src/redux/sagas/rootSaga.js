import {all} from "redux-saga/effects";
import auth from "./auth";
import user from "./user";
import company from "./company";
import job from "./job";
import common from "./common";
import news from "./news";

export default function* rootSaga() {
	yield all([
		auth(),
		user(),
		company(),
		job(),
		common(),
		news(),
	])
};
