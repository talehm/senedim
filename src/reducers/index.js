
import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import errorHandlingReducer from './errorHandlingReducer';

export default combineReducers({
  productData: dataReducer,
  errorHandling: errorHandlingReducer,
});
