import { configureStore, createStore } from "@reduxjs/toolkit";
import { Store, applyMiddleware } from "redux";
import reducer from "./features/project/projectReducer";
import thunk from "redux-thunk";

export const store: Store<ProjectState, ProjectAction> & {
    dispatch: DispatchType
} = configureStore({
    reducer: reducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;