import { combineReducers } from 'redux';

//Reducers
import user from './user';
import navigation from './navigate';
import category from "./category";
import client from "./client";
import provider from "./provider";
import product from "./product";
import sales from "./sales";
import buys from "./buys";

export default combineReducers({
  user,
  navigation,
  category,
  client,
  provider,
  product,
  sales,
  buys
});