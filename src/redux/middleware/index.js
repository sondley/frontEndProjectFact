import { applyMiddleware } from 'redux';

//Middlewares
import thunk from 'redux-thunk';
import logger from './logger';

export default applyMiddleware(
  thunk,
  logger
);