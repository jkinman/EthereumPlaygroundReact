import { ADD_NEW_BLOCK } from './const';

export function addNewBlock(parameter) {
  return { type: ADD_NEW_BLOCK, parameter }  
}
