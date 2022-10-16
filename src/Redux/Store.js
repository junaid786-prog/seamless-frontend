import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { ChangeMyPassword, LoginUser, LogoutUser, UserProfile } from "./reducers/UserReducers"
import {
  CreateAgent,
  CreateSubAdmin,
  CreditAgent,
  DeleteSubAdmin,
  EditAgent,
  EditSubAdmin,
  GetMyAgents,
  GetMySubAdmins,
  GetMyTransactions,
  WithdrawAgent,
} from "./reducers/AdminReducers"

const middelWare = [thunk]
const RootReducer = combineReducers({
  // normal user functions
  loggedInUser: LoginUser,
  userProfile: UserProfile,
  loggedOutUser: LogoutUser,
  changedPassword: ChangeMyPassword,

  createdAgent: CreateAgent,
  createdSubAdmin: CreateSubAdmin,

  deletedSubAdmin: DeleteSubAdmin,

  creditAgent: CreditAgent,
  withdrawAgent: WithdrawAgent,
  
  mySubAdmins: GetMySubAdmins,
  myAgents: GetMyAgents,
  myTransactions: GetMyTransactions,

  edittedAgent: EditAgent,
  edittedSubAdmin: EditSubAdmin
})
const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middelWare))
)
export default Store
