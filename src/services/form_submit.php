<?php
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

    // Construct the email content
    $emailSubject = "Corporate Inquiry from $name";
    $emailBody = "
        Name: $name
        Email: $email
        Message: $message
        
        Movie Booking Details:
        Movie Title: $movieTitle
        Event Date: $eventDate
        Event Name: $eventName
        Number of Pax: $numberOfPax
        Preferred Time: $preferredTime
    ";

    // Set recipient email and headers
    $toEmail = "wong1289@e.ntu.edu.sg";
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send the email
    if (mail($toEmail, $emailSubject, $emailBody, $headers)) {
        echo "Success: Your message has been sent successfully!";
    } else {
        echo "Error: There was an issue sending your message.";
    }
} else {
    echo "Error: Invalid request method.";
}
?>
