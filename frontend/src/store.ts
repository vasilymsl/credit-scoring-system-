import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";

// Объединяем редьюсеры
const rootReducer = combineReducers({
    filter: filterReducer,
});

// Создаем store
const store = configureStore({
    reducer: rootReducer,
});

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

