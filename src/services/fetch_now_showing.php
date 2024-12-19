<?php
header('Content-Type: application/json');

require_once '../utils/db_connection.php';

try {
    $stmt = $conn->prepare("
        SELECT 
            s.*,
            GROUP_CONCAT(DISTINCT st.show_date) as showtimes,
            GROUP_CONCAT(DISTINCT l.location_id) as locations,
            GROUP_CONCAT(DISTINCT l.name) as location_names
        FROM shows s
        LEFT JOIN showtimes st ON s.show_id = st.show_id
        LEFT JOIN locations l ON st.location_id = l.location_id
        WHERE st.show_date >= CURDATE()
        GROUP BY s.show_id
    ");
    
    $stmt->execute();
    $movies = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($movies);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
