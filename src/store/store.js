import { configureStore, combineReducers } from "@reduxjs/toolkit";
import taskReducer from "./task";
import { logger } from "./middleware/logger";
import errorReducer from "./errors";

// этот store from redux
const rootReduser = combineReducers({
    errors: errorReducer,
    tasks: taskReducer
})

function createStore() {
    return configureStore({
        reducer: rootReduser,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== 'production',
    })
};

export default createStore;