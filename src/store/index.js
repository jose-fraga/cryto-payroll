import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers, { initialState } from './reducers';

let logger = createLogger({});
let middlewares = [ thunk ];

/**
 * @todo find another way to check if is prod env
 */
if (process.env.NODE_ENV !== 'prod') {
  middlewares = [ ...middlewares, logger ];
}

function configStore() {
  return createStore(reducers, initialState, applyMiddleware(...middlewares));
}

export default configStore();
