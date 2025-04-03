import {defineStore} from "pinia";
import axios from "axios";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    popularMovies: [],
    reccomendations: [],
    likedMovies: JSON.parse(localStorage.getItem('likedMovies')) || [],
  }),
  actions: {
    async fetchPopularMovies() {
      const response = await axios.get('http://localhost:8000/popular');
      this.popularMovies = response.data; // Remove .results
    },
    async fetchRecommendations(movieId) {
      const response = await axios.get(`http://localhost:8000/recommendations/${movieId}`);
      this.recommendations = response.data; // Remove .results
    },
    likeMovie(movie) {
      this.likedMovies.push(movie);
      localStorage.setItem(('likedMovies'), JSON.stringify(this.likedMovies));
    }
  }
});