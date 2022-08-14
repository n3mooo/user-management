import { createStore, combineReducers } from "redux";
import userSlice from "features/users/userSlice";

const rootReducer = combineReducers({
    user: userSlice,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
