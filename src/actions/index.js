import axios from "axios";

export const getMovies2 = movies => ({
  type: "GET_MOVIES",
  movies
});

export const updateSearchKey = key => ({
  type: "UPDATE_SEARCH_KEY",
  key
});

export const filterMovies = key => ({
  type: "Filter_MOVIES",
  key
});

export const asyncFilterMovies = key => {
  return dispatch => {
    new Promise((resolve, reject) => {
      //dispatch(getMovies(1));
      resolve();
    }).then(() => {
      dispatch(filterMovies(key));
    });
  };
};

export const getMovies = page => {
  return dispatch => {
    axios
      .get(`CONTENTLISTINGPAGE-PAGE${page}.json`)
      .then(res => {
        dispatch(getMovies2(res.data.page["content-items"].content));
      })
      .catch(error => {
        console.log(`error: ${error}`);
      });
  };
};
