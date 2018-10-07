import axios from "axios";

export const getMovies2 = movies => ({
  type: "GET_MOVIES",
  movies
});

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
