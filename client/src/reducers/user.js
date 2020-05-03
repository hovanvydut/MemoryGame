const tokenName = 'vyToken';

const vyToken = localStorage.getItem(tokenName);
const currentRoom = localStorage.getItem('currentRoom');

const initialState = {
  info: vyToken ? JSON.parse(atob(vyToken.split('.')[1])) : null,
  currentRoom: currentRoom ? currentRoom : null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_ROOM': {
      const { joinRoomName } = action.payload;
      localStorage.setItem('currentRoom', joinRoomName);
      return { ...state, currentRoom: joinRoomName };
    }

    case 'CLEAR_CURRENT_ROOM': {
      localStorage.removeItem('currentRoom');
      return { ...state, currentRoom: null };
    }

    case 'SET_USER_INFO': {
      const vyToken = localStorage.getItem(tokenName);
      return {
        ...state,
        info: vyToken ? JSON.parse(atob(vyToken.split('.')[1])) : null,
      };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
