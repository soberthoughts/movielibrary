<template>
<div>
<div v-if="loading" class="loading-state">Loading movies...</div>

<div v-else-if="error" class="error-message">
  ❌ {{ error }}
  <button @click="fetchPopularMovies">Retry</button>
</div>

<div v-else class="movie-grid">
  <button @click="showFavorites" class="favorite-button">
    {{ showOnlyFavorites ? 'Show All' : 'Show Favorites' }}
  </button>
  <MovieCard
      v-for="movie in filteredMovies"
      :key="movie.id"
      :movie="movie"
  />
</div>
</div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMovieStore } from '@/stores/movieStore'
import {computed, onMounted, ref, watch} from 'vue'
import MovieCard from '@/views/MovieCard.vue'

const store = useMovieStore()
const { popularMovies, loading, error } = storeToRefs(store)
const { fetchPopularMovies } = store

const showOnlyFavorites = ref(false)

const filteredMovies = computed(() => {
  if (showOnlyFavorites.value) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    return popularMovies.value.filter(movie =>
        favorites.some(fav => fav.id === movie.id)
    )
  }
  return popularMovies.value
})

const showFavorites = () => {
  showOnlyFavorites.value = !showOnlyFavorites.value
}

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
