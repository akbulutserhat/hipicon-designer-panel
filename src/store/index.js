import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from './modules/index'
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    reducer,  
      composeWithDevTools(applyMiddleware(thunk))
  );

export default store;