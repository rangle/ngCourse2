const todo = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        completed: !state.completed
      });
    // return state;
    default:
      return state;
  };
};

const initialState = [
  {
    id: 1,
    title: 'learn TypeScript',
    completed: true
  }, {
    id: 2,
    title: 'learn Angular 2',
    completed: false
  }
];

const todos = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      );
    default:
      return state;
  };
};

export default todos;
