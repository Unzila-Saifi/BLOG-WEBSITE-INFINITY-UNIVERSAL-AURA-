<?php
// Database connection
$servername = "localhost";
$username = "root"; // default username
$password = ""; // default password is empty
$dbname = "faq_form"; 

// Create connection
$conn = new mysqli($servername, $username, $password, $faq_form);

// Check connection
if ($conn->connect_error) { 
    die("Connection failed: " . $conn->connect_error);
}
else{
    $stmt $conn->prepare("insert into faq (question)
    values(?)");
    $stmt->bind_param("s")
}
?>
