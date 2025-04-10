<template>
  <div>
    <div v-if="loading" class="loading-state">Loading movies...</div>

    <div v-else-if="error" class="error-message">
      ❌ {{ error }}
      <button @click="fetchPopularMovies">Retry</button>
    </div>

    <div v-else class="movie-grid">
      <MovieCard
          v-for="movie in popularMovies"
          :key="movie.id"
          :movie="movie"
      />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMovieStore } from '@/stores/movieStore'
import { onMounted } from 'vue'
import MovieCard from '@/views/MovieCard.vue'

const store = useMovieStore()
const { popularMovies, loading, error } = storeToRefs(store)

const { fetchPopularMovies } = store

onMounted(() => {
  fetchPopularMovies()
})
</script>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
.loading-state {
  text-align: center;
  padding: 40px;
}
.error-message {
  color: red;
  padding: 20px;
  text-align: center;
}
</style>
