<?php
require __DIR__ . '/../vendor/autoload.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

use App\TMDBService;

$tmdb = new TMDBService('YOUR_TMDB_API_KEY');

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($path === '/popular') {
    echo json_encode($tmdb->getPopularMovies());
} elseif (preg_match('/^\/recommendations\/(\d+)$/', $path, $matches)) {
    echo json_encode($tmdb->getRecommendations((int)$matches[1]));
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}