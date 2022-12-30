import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/*
useAppDispatch and useAppSelector methods are referenced from https://www.youtube.com/watch?v=ZGnMqKg-Cq4&ab_channel=Deanin
*/

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
