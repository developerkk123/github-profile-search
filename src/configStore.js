import { createStore } from "redux";
import allReducer from "./reducer/AllReducer";
const store = createStore(allReducer);
export default store
