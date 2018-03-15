import { LOAD_TRANSACTION } from './const';

export function loadTransaction(parameter) {
  return { type: LOAD_TRANSACTION, parameter }  
}
