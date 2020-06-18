import { all } from "redux-saga/effects";
import auth from "./auth";
import user from "./user";
import company from "./company";

export default function* rootSaga() {
   yield all([
      auth(),
      user(),
      company(),
   ])
};
