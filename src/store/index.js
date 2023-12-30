import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "../store/actions/thunks";
import dashboardReducer from "./reducers/dasboardReducer";
import employeeReducer from "./reducers/employeeReducer";
import candidateReducer from "./reducers/candidateReducer";
import feeReducer from "./reducers/feeReducer";
import roleReducer from "./reducers/roleReducer";
import detailRoleReducer from "./reducers/detailRoleReducer";
import userReducer from "./reducers/userReducer";
import detailEmployeeReducer from "./reducers/detailEmployeeReducer";
import detailUserReducer from "./reducers/detailUserReducer";
import detailFeeReducer from "./reducers/detailFeeReducer";
import profileReducer from "./reducers/profileReducer";
import imagesReducer from "./reducers/imagesReducer";
import logactivityReducer from "./reducers/logactivityReducer";
import privilegeReducer from "./reducers/privilegeReducer";
import transactionReducer from "./reducers/transactionReducer";
import withdrawReducer from "./reducers/withdrawReducer";

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  transaction: transactionReducer,
  profile: profileReducer,
  logactivity: logactivityReducer,
  image: imagesReducer,
  employees: employeeReducer,
  employee: detailEmployeeReducer,
  candidates: candidateReducer,
  fees: feeReducer,
  fee: detailFeeReducer,
  roles: roleReducer,
  role: detailRoleReducer,
  users: userReducer,
  user: detailUserReducer,
  privilege: privilegeReducer,
  withdraw: withdrawReducer,
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
