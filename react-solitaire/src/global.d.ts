// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RefAny = any;

export type ValueOf<T> = T[typeof T];

type RootReducer = typeof import("./redux/reducers").rootReducer;
export type RootReducerState = {
  [P in keyof RootReducer]: ReturnType<RootReducer[P]>;
};
