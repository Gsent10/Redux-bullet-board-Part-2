import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../features/postSlice';
import usersReducer from '../features/usersSlice';


export const store = configureStore({
    reducer:{
        posts: postReducer,
        users: usersReducer,
    }
})