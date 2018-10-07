import { combineReducers } from "redux";

const initalState = [];

const moviesReducer = (state = initalState, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return [...state, ...action.movies];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  movies: moviesReducer
});

export default rootReducer;
