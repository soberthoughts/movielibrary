<template>
  <div class="movie-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-spinner">
      Loading movies...
    </div>

    <!-- Error State -->
    <div v-if="error" class="error-message">
      ❌ {{ error }}
      <button @click="fetchMovies">Retry</button>
    </div>

    <!-- Popular Movies -->
    <div v-if="!loading && !error">
      <h2>Popular Movies</h2>
      <div class="movie-grid">
        <div v-for="movie in popularMovies" :key="movie.id" class="movie-card">
          <img
              v-if="movie.poster_path"
              :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
              :alt="movie.title"
          >
          <div class="movie-info">
            <h3>{{ movie.title }}</h3>
            <p>⭐ {{ movie.vote_average?.toFixed(1) }}</p>
            <p>🗓️ {{ movie.release_date }}</p>
            <div class="movie-actions">
              <button @click="likeMovie(movie)">
                {{ isLiked(movie.id) ? '❤️ Liked' : '🤍 Like' }}
              </button>
              <button @click="fetchRecommendations(movie.id)">
                🎬 Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recommendations Section -->
    <div v-if="recommendations.length > 0" class="recommendations">
      <h3>Recommended For You</h3>
      <div class="movie-grid">
        <MovieCard
            v-for="movie in recommendations"
            :key="movie.id"
            :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMovieStore } from '@/stores/movie'
import MovieCard from '@/components/MovieCard.vue'

const store = useMovieStore()
const { popularMovies, recommendations, loading, error } = storeToRefs(store)
const { fetchPopularMovies, fetchRecommendations, likeMovie } = store

// Check if movie is liked
const isLiked = (movieId) => {
  return store.likedMovies.some(m => m.id === movieId)
}

// Initial load
fetchPopularMovies()
</script>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.movie-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}
.movie-card:hover {
  transform: translateY(-5px);
}
.movie-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.loading-spinner {
  text-align: center;
  padding: 2rem;
}
.error-message {
  color: red;
  padding: 1rem;
  text-align: center;
}
</style>