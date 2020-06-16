import { all } from "redux-saga/effects";
import login from "./auth"

export default function* rootSaga() {
   yield all([
      login()
   ])
};