import { combineReducers } from "redux";
import fetch_reducer from "./fetch_reducer";

const rootReducer = combineReducers({ fetch_reducer });

export default rootReducer;
