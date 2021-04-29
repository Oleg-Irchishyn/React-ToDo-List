import { createStore, combineReducers, compose, applyMiddleware, Action } from 'redux';
import appReducer from './reducers/appReducer';
import sidebarReducer from './reducers/sidebarReducer';
import tasksReducer from './reducers/tasksReducer';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

let rootReducer = combineReducers({
  app: appReducer,
  sidebar: sidebarReducer,
  tasks: tasksReducer,
  form: formReducer,
});

const middlewares = [thunkMiddleware];

type rootReducerType = typeof rootReducer;
type PropertiesType<Type> = Type extends { [key: string]: infer AC } ? AC : never;

export type AppStateType = ReturnType<rootReducerType>;
export type InferActionsTypes<Type extends { [key: string]: (...args: any[]) => any }> = ReturnType<
  PropertiesType<Type>
>;
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
// @ts-ignore

window.__store__ = store;
export default store;
