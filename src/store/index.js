import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "../store/actions/thunks";
import employeeReducer from "./reducers/employeeReducer";
import provinceReducer from "./reducers/provinceReducer";
import regencyReducer from "./reducers/regencyReducer";
import districtReducer from "./reducers/districtReducer";
import villageReducer from "./reducers/villageReducer";
import detailEmployeeReducer from "./reducers/detailEmployeeReducer";

const rootReducer = combineReducers({
  employees: employeeReducer,
  employee: detailEmployeeReducer,
  province: provinceReducer,
  regency: regencyReducer,
  district: districtReducer,
  village: villageReducer
});

// middleware logger
const logger = (store) => (next) => (action) => {
  // console.log("dispatching", action);
  let result = next(action);
  // console.log("next state", store.getState());
  return result;
};

let store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
