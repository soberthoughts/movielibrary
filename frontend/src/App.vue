<template>
  <div>
    <h1>Movie Recommender</h1>

    <!-- Debug Output -->
    <pre v-if="popularMovies.length === 0">Loading movies...</pre>
    <pre v-else>{{ popularMovies }}</pre>

    <!-- Movie List -->
    <div v-for="movie in popularMovies" :key="movie.id" class="movie-card">
      <h3>{{ movie.title }}</h3>
      <img
          v-if="movie.poster_path"
          :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
          :alt="movie.title"
      >
      <p>Year: {{ movie.year }}</p>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMovieStore } from '@/stores/movieStore';
import {onMounted} from "vue";

const store = useMovieStore();
const { popularMovies } = storeToRefs(store);

// Fetch movies when component mounts
onMounted(() => {
  store.fetchPopularMovies();
});
</script>