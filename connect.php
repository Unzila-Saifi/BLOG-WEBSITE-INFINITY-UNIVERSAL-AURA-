<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
// database connection
$conn = new mysqli('localhost','root','','contact');
if($conn->connect_error){
    die('connection Failed:'.$conn->connect_error);
}else{
    $stmt= $conn->prepare("insert into contact(name,email,reason,message)values(?,?,?,?)");
    $stmt->bind-param("ssss",$name, $email, $message);
    $stmt->execute();
    echo("successfullyy entered...");
    $stmt->close();
    $conn->close(); 
}
?>