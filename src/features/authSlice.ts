// This function is used to create a new slice, which is a small unit of state that can be managed by Redux.
import { createSlice } from "@reduxjs/toolkit";
// This model defines the data that will be stored in the auth slice.
import { User } from "../models/User";
// This type is used to define the type of actions that can be dispatched to the auth slice.
import type { PayloadAction } from "@reduxjs/toolkit"

// This interface defines the state that will be stored in the auth slice.
export interface AuthState {
    user: null | User
}
// The initial state is an object with a single property, user, which is set to null.
const initialState: AuthState = {
    user: null,
}

/* The authSlice slice is created using the createSlice function. 
   The createSlice function takes three arguments: the name of the slice, the initial state, and the reducers.
*/
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        }
    }
})

// The authSlice.actions object contains the action creators for the auth slice.
export const { login, logout } = authSlice.actions

// The authSlice.reducer function is the reducer that is used to update the state of the auth slice.
export default authSlice.reducer