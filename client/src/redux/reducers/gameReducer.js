import { ANSWER_TO_THE_QUESTION, ALL_GAMES,LOGIN_USER } from '../types/index';

const gameReducer = (state = {}, action) => {
  switch (action.type) {
    case ANSWER_TO_THE_QUESTION:
      return state;
    // games: [...state.games, ]
    // тут логика отметки, отвечен ли вопрос или нет
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload
      }
    case ALL_GAMES:
      return {
        games: action.payload,
      };
    default:
      return state;
  }
};

export default gameReducer;
