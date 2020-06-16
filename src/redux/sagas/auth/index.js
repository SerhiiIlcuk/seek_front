import {
   takeEvery,
   takeLatest,
   take,
   put,
   race,
   call,
   select,
} from "redux-saga/effects";

function* actionWatcher() {
   yield takeLatest('LOGIN', login);
}

function* login() {
   try {

   } catch (e) {

   }
}

export default actionWatcher;