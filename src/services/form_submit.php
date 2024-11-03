<?php

// Include the database connection and assign it to $conn
try {
    $conn = include '../utils/db_connection.php';
} catch (PDOException $e) {
    error_log("Connection failed: " . $e->getMessage());
    echo "Sorry, there was a problem connecting to the database.";
    exit;
}

// Function to validate email
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Check if the form data is received using POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $movieTitle = htmlspecialchars($_POST['movie-title']);
    $eventDate = htmlspecialchars($_POST['event-date']);
    $eventName = htmlspecialchars($_POST['event-name']);
    $numberOfPax = htmlspecialchars($_POST['number-of-pax']);
    $preferredTime = htmlspecialchars($_POST['preferred-time']);

    // Validate email
    if (!validateEmail($email)) {
        echo "Invalid email format.";
        exit;
    }

    try {
        // Prepare and bind the SQL statement
        $stmt = $conn->prepare("INSERT INTO inquiries (name, email, message, movie_title, event_date, event_name, number_of_pax, preferred_time) VALUES (:name, :email, :message, :movieTitle, :eventDate, :eventName, :numberOfPax, :preferredTime)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':message', $message);
        $stmt->bindParam(':movieTitle', $movieTitle);
        $stmt->bindParam(':eventDate', $eventDate);
        $stmt->bindParam(':eventName', $eventName);
        $stmt->bindParam(':numberOfPax', $numberOfPax);
        $stmt->bindParam(':preferredTime', $preferredTime);

        // Execute the statement
        if ($stmt->execute()) {
            echo "Success: Your inquiry has been recorded!";
        } else {
            error_log("Error: " . $stmt->errorInfo()[2]);
            echo "Sorry, there was a problem recording your inquiry.";
        }
    } catch (PDOException $e) {
        error_log("Error: " . $e->getMessage());
        echo "Sorry, there was a problem with your request.";
    }

    // Close the connection
    $conn = null;
} else {
    echo "Error: Invalid request method.";
}
?>
