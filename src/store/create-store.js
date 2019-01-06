import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/sagas";

const sagaMiddleware = createSagaMiddleware();
let composeEnhancer = compose;

const createstore = () => {
    const store = createStore(
        rootReducer,
        composeEnhancer(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(rootSaga);
    return store;
};

export default createstore;
