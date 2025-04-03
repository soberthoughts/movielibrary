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
      const response = await axios.get('http://localhost:8080/popular');
      this.popularMovies = response.data.results;
    },
    async fetchRecommendations() {
      const response = await axios.get('http://localhost:8080/recommendations/$(movieId)');
      this.reccomendations = response.data.results;
    },
    likeMovie(movie) {
      this.likedMovies.push(movie);
      localStorage.setItem(('likedMovies'), JSON.stringify(this.likedMovies));
    }
  }
});