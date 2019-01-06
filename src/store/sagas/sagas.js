import { all } from "redux-saga/effects";
import fetchSaga from "./fetch_saga";

export default function* rootSaga() {
    yield all([fetchSaga()]);
}
