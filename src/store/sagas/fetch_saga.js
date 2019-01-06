import { call, put, takeLatest } from "redux-saga/effects";
import Services from "../services/services";
import { FETCH, FETCHED } from "../arsVariables";
// import { Actions } from "../actions";

function* fetchInfo(payload) {
    console.log("from fetch saga", { payload });
    try {
        const data = yield call(Services.fetch, payload);
        const { error } = data;
        if (!error) {
            return yield put({ type: FETCHED, data });
        }
    } catch (error) {
        console.log({ error });
        return yield put({ type: "FETHC_FAILURE", ...error });
    }
}

export default function* fetchSaga() {
    yield takeLatest(FETCH, fetchInfo);
}
