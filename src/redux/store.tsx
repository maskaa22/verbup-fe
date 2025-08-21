import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import dictReducer from "./dict/slice";
import gameSlice from "./game/slice";
import notifyReducer from "./notify/slice"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import type { GameState } from "../utils/gameType";

// const persistConfig = {
//   key: "game",
//   version: 1,
//   storage,
// };

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dict: dictReducer,
    notify: notifyReducer,
    // game: persistReducer<GameState>(persistConfig, gameSlice),
      game: gameSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
