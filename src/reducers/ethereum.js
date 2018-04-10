import { ADD_NEW_BLOCK } from "../actions/const";

const initialState = { blockArray: [], latestBlock: 0 };

function reducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case ADD_NEW_BLOCK: {
      nextState.blockArray.push(action.parameter);
      nextState.blockArray = nextState.blockArray.sort(
        (a, b) => a.number - b.number
      );
      while (nextState.blockArray.length > 50) {
        nextState.blockArray.pop();
      }
      nextState.latestBlock = action.parameter;
      return nextState;
    }

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
export default reducer;
