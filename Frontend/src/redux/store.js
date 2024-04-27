import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootreducer";
import { thunk } from "redux-thunk";

const store= configureStore({
    reducer:rootReducer,
    middleware:()=>[thunk]
})
export default store