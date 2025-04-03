<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Popular Movies</h1>
    <div v-for="movie in popularMovies" :key="movie.id" class="mb-6">
      <img
        :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
        :alt="movie.title"
        class="rounded shadow" />
      <h3 class="text-xl mt-2>">{{ movie.title }}</h3>
      <button
        @click="likeMovie(movie)"
        class="bg-blue-500 text-white px-3 py-1 rounded mr-2">
        Like
      </button>
      <button
        @click = "fetchRecommendations(movie.id)"
        class = "bg-green-500 text-white px-3 py-1 rounded">
        Get Recommendations
      </button>
    </div>
  </div>
</template>

<script setup>
import {useMovieStore} from "@/stores/movieStore";
import {storeToRefs} from "pinia";

const movieStore = useMovieStore();
const { popularMovies } = storeToRefs(movieStore);

movieStore.fetchPopularMovies();

const likeMovie = (movie) => {
  movieStore.likeMovie(movie);
};
const fetchRecommendations = (movieId) => {
  movieStore.fetchRecommendations(movieId);
};
</script>