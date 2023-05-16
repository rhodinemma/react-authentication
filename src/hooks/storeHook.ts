// These hooks are used to connect a React component to the Redux store.
import { useDispatch, useSelector } from 'react-redux';
// This type is used to define the type of selector that can be used with the useSelector hook.
import type { TypedUseSelectorHook } from 'react-redux';

// These types define the type of state that is stored in the store and the type of actions that can be dispatched to the store.
import type { RootState, AppDispatch } from '../store';

// The useAppDispatch function is used to get the dispatch function from the Redux store.
export const useAppDispatch: () => AppDispatch = useDispatch;
// The useAppSelector function is used to get a selector that can be used to get the current state of the store.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;