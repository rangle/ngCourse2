export const CAST_CURSE = 'CAST_CURSE';
export const REMOVE_CURSE = 'REMOVE_CURSE';

export function castCurse() {
  return {
    type: CAST_CURSE
  };
}

export function removeCurse() {
  
  return {
    type: REMOVE_CURSE
  };
}

export function castIfOdd() {
  return (dispatch, getState) => {
    const { curse } = getState();

    if (curse % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function castAsync(delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(castCurse());
    }, delay);
  };
}