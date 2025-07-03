<?php
// Database connection
$title = $_POST['title'];
$review = $_POST['review'];
$rating = $_POST['rating'];
$portable = $_POST['portable'];
$easy = $_POST['easy'];
$comfirtable = $_POST['comfirtable'];
$username = $_POST['username'];
$email = $_POST['email'];
 
// Create connection
$conn = new mysqli('localhost', 'root','', 'review_form');

// Check connection
if ($conn->connect_error) { 
    die("Connection failed: " . $conn->connect_error);
}
else{
    $stmt $conn->prepare("insert into review (title , review , rating , portable , easy , comfirtable , username ,email);
    values(?,?,?,?,?,?,?,?)");
    $stmt->bind_param("ssssssss",$title, $review, $rating,$portable,$easy,$comfirtable,$username,$email);
    $stmt->execute();
   echo"submit successfully";
   $stmt->close();
    $conn->close();
}
?>