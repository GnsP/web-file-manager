import { createStore } from 'redux';
import mainReducer from 'store/reducers';

export const store = createStore (mainReducer); //, fstate.getInitialState());
