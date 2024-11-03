<?php
// Include the database connection
$conn = require '../utils/db_connection.php';

// Query to find all featured wines
$sql = "SELECT name, description, image_url FROM wine WHERE featured = 1"; // Fetching wines marked as featured

try {
    // Prepare and execute the query
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    // Fetch results
    $wines = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return results as JSON
    header('Content-Type: application/json');
    echo json_encode($wines);
} catch (PDOException $e) {
    // Handle query error
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => $e->getMessage()]);
}

// Close the connection
$conn = null; 
?>
