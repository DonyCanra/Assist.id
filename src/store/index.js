import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "../store/actions/thunks";
import dashboardReducer from "./reducers/dasboardReducer";
import employeeReducer from "./reducers/employeeReducer";
import candidateReducer from "./reducers/candidateReducer";
import feeReducer from "./reducers/feeReducer";
import roleReducer from "./reducers/roleReducer copy";
import userReducer from "./reducers/userReducer";
import detailEmployeeReducer from "./reducers/detailEmployeeReducer";
import detailUserReducer from "./reducers/detailUserReducer";
import detailFeeReducer from "./reducers/detailFeeReducer";

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  employees: employeeReducer,
  employee: detailEmployeeReducer,
  candidates: candidateReducer,
  fees: feeReducer,
  fee: detailFeeReducer,
  roles: roleReducer,
  users: userReducer,
  user: detailUserReducer,
});

// middleware logger
const logger = (store) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};

let store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
