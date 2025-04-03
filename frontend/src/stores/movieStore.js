// stores/movie.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    popularMovies: [],
    recommendations: [],
    likedMovies: JSON.parse(localStorage.getItem('likedMovies')) || [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchPopularMovies() {
      try {
        const response = await axios.get('http://localhost:8000/popular');
        console.log('API Response:', response.data); // 👈 Check browser console
        this.popularMovies = response.data; // Remove .results if your API doesn't nest data
      } catch (error) {
        console.error('API Error:', error);
      }
    },
    async fetchRecommendations(movieId) {
      this.loading = true
      try {
        const { data } = await axios.get(`http://localhost:8000/recommendations/${movieId}`)
        this.recommendations = data
      } catch (err) {
        this.error = err.response?.data?.error || 'Failed to get recommendations'
      } finally {
        this.loading = false
      }
    },
    likeMovie(movie) {
      this.likedMovies.push(movie)
      localStorage.setItem('likedMovies', JSON.stringify(this.likedMovies))
    }
  }
})