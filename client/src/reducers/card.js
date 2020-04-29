const initialState = [];

const CardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOT_FOUND': {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default CardReducer;
