<?php
require __DIR__ . '/../vendor/autoload.php';
// Load .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

use App\TMDBService;

$apiKey = $_ENV['TMDB_API_KEY']; // Get key from .env

if (empty($_ENV['TMDB_API_KEY'])) {
    die("ERROR: TMDB_API_KEY not loaded. Check .env file permissions and content.");
}

$tmdb = new TMDBService($apiKey);

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($path === '/popular') {
    echo json_encode($tmdb->getPopularMovies());
} elseif (preg_match('/^\/recommendations\/(\d+)$/', $path, $matches)) {
    echo json_encode($tmdb->getRecommendations((int)$matches[1]));
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}