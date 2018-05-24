import { ADD_NEW_BLOCK, ADD_ERC20_TOKEN } from './const';

export function addNewBlock(parameter) {
  return { type: ADD_NEW_BLOCK, parameter }  
}

export function addERC20Token(parameter) {
  return { type: ADD_ERC20_TOKEN, parameter }  
}
