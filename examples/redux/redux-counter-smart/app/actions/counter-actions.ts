export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  
  return {
    type: DECREMENT_COUNTER
  };
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

const delay = (timeInMs) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => resolve() , timeInMs);
  });
}

export function incrementAsync(timeInMs = 1000) {
  return dispatch => {
    delay(timeInMs).then(() => dispatch(increment()))  
  };
}