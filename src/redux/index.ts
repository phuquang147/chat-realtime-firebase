import { applyMiddleware, combineReducers, createStore } from 'redux';
import createMiddlewareSaga from 'redux-saga';
import { UserReducer } from './reducer/UserReducer';
import { ModalReducer } from './reducer/ModalReducer';
import { RoomReducer } from './reducer/RoomReducer';
import rootSaga from './sagas/rootSaga';

const middlewareSaga = createMiddlewareSaga();
const rootReducer = combineReducers({
  ModalReducer,
  UserReducer,
  RoomReducer,
});

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));

middlewareSaga.run(rootSaga);

export { store };
