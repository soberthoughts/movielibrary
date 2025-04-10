<template>
  <div class="movie-card">
    <button @click="toggleFavorite" class="favorite-button">
      {{ isFavorite ? '★' : '☆' }} Favorite
    </button>

    <img
        v-if="movie.poster_path"
        :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
        :alt="movie.title"
        class="movie-poster"
    >

    <div class="movie-info">
      <h3>{{ movie.title }}</h3>
      <div class="movie-meta">
        <span class="rating">⭐ {{ movie.vote_average?.toFixed(1) }}</span>
        <span class="year">{{ movie.release_date?.substring(0, 4) }}</span>
      </div>
      <p class="overview">{{ truncatedOverview }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const favorites = ref([])

onMounted(() => {
  const stored = localStorage.getItem('favorites')
  if (stored) {
    favorites.value = JSON.parse(stored)
  }
})

const isFavorite = computed(() =>
    favorites.value.some(fav => fav.id === props.movie.id)
)

const toggleFavorite = () => {
  const index = favorites.value.findIndex(fav => fav.id === props.movie.id)
  if (index !== -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(props.movie)
  }
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

const truncatedOverview = computed(() => {
  return props.movie.overview?.length > 100
      ? props.movie.overview.substring(0, 100) + '...'
      : props.movie.overview
})
</script>

<style scoped>
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
.favorite-button {
  padding: 6px 12px;
  margin: 10px;
  background-color: #eee;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
