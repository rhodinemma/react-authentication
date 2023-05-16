// This function is used to create a new store, which is a central repository for state in a React application.
import { configureStore } from "@reduxjs/toolkit"
// This slice defines the state that will be stored in the store.
import authSlice from "./features/authSlice"

/* The configureStore function takes one argument: the reducers. 
   The reducers are functions that are used to update the state of the store.

   The configureStore function returns a store object. The store object has two properties: getState and dispatch. 
   The getState property is used to get the current state of the store. 
   The dispatch property is used to dispatch actions to the store.
*/
export const store = configureStore({
    reducer: {
        auth: authSlice
    },
})

// The RootState type defines the type of state that will be stored in the store.
export type RootState = ReturnType<typeof store.getState>
// The AppDispatch type defines the type of actions that can be dispatched to the store.
export type AppDispatch = typeof store.dispatch