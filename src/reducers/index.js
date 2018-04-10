import {combineReducers} from "redux";
import ethereum from "../reducers/ethereum";

const reducers = {
		ethereum
};
const combined = combineReducers(reducers);

// module.exports = combined;
export default combined;
