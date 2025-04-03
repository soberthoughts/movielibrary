<!-- components/MovieCard.vue -->
<template>
  <div class="movie-card">
    <img
        v-if="movie.poster_path"
        :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
        :alt="movie.title"
        class="movie-poster"
    >
    <div class="movie-details">
      <h3>{{ movie.title }}</h3>
      <p>{{ movie.overview?.substring(0, 100) }}...</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  movie: {
    type: Object,
    required: true
  }
})
</script>