<template>
  <div class="movie-app">
    <h1>Movie Recommender</h1>

    <!-- Movie Grid -->
    <div v-if="popularMovies.length" class="movie-grid">
      <div v-for="movie in popularMovies" :key="movie.id" class="movie-card">
        <!-- Movie Poster -->
        <img
            v-if="movie.poster_path"
            :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
            :alt="movie.title"
            class="movie-poster"
        >

        <!-- Movie Info -->
        <div class="movie-info">
          <h3>{{ movie.title }}</h3>
          <div class="movie-meta">
            <span class="rating">⭐ {{ movie.vote_average?.toFixed(1) }}</span>
            <span class="year">{{ movie.release_date?.substring(0, 4) }}</span>
          </div>
          <p class="overview">{{ truncateOverview(movie.overview) }}</p>
        </div>
      </div>
    </div>

    <!-- Loading/Empty State -->
    <div v-else class="loading-state">
      {{ popularMovies.length === 0 ? 'Loading movies...' : 'No movies found' }}
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMovieStore } from '@/stores/movieStore'
import { onMounted } from 'vue'

const store = useMovieStore()
const { popularMovies } = storeToRefs(store)

// Helper function to shorten overview
const truncateOverview = (text) => {
  return text?.length > 100 ? text.substring(0, 100) + '...' : text
}

// Fetch movies when component mounts
onMounted(() => {
  store.fetchPopularMovies()
})
</script>

<style scoped>
.movie-app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.movie-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.movie-poster {
  width: 100%;
  height: 375px;
  object-fit: cover;
}

.movie-info {
  padding: 15px;
}

.movie-info h3 {
  margin: 0 0 10px;
  font-size: 1.1rem;
}

.movie-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #666;
}

.overview {
  font-size: 0.9rem;
  color: #444;
  margin: 0;
}

.loading-state {
  text-align: center;
  padding: 40px;
  color: #666;
}
</style>