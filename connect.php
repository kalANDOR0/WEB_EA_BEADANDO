<?php
$host = 'localhost';
$user = 'adatbazis_eload'; 
$pass = 'Jeleszavak1ketto3';
$dbname   = 'adatbazis_eload';

try {
    $dbh = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass,
           array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
} catch (PDOException $e) {
    print "Hiba!: " . $e->getMessage();
    die();
}