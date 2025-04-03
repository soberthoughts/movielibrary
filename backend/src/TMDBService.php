<?php
namespace App;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class TMDBService
{
    private $apiKey;
    private $httpClient;

    public function __construct(string $apiKey)
    {
        $this->apiKey = $apiKey;
        $this->httpClient = new Client([
            'base_uri' => 'https://api.themoviedb.org/3/',
            'timeout'  => 2.0,
            'verify' => false, // Disable SSL verification for local development
        ]);
    }



    /**
     * Get popular movies from TMDB
     */
    public function getPopularMovies(): array
    {
        try {
            $response = $this->httpClient->get('movie/popular', [
                'query' => ['api_key' => $this->apiKey]
            ]);
            return json_decode($response->getBody(), true)['results'] ?? [];
        } catch (GuzzleException $e) {
            error_log('TMDB API Error: ' . $e->getMessage());
            return ['error' => 'Failed to fetch popular movies'];
        }
    }

    /**
     * Get recommendations for a specific movie
     */
    public function getRecommendations(int $movieId): array
    {
        try {
            $response = $this->httpClient->get("movie/{$movieId}/recommendations", [
                'query' => ['api_key' => $this->apiKey]
            ]);
            return json_decode($response->getBody(), true)['results'] ?? [];
        } catch (GuzzleException $e) {
            error_log('TMDB API Error: ' . $e->getMessage());
            return ['error' => 'Failed to fetch recommendations'];
        }
    }
}