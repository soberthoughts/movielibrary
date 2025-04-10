<template>
  <div class="movie-app">
    <h1>Movie Recommender</h1>
    <MovieList />
  </div>
</template>

<script setup>
import MovieList from '@/views/MovieList.vue'
</script>

<style scoped>
.movie-app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
