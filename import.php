<?php
// --- 1. ADATBÁZIS BEÁLLÍTÁSOK ---
$host = 'localhost';
$user = 'adatbazis_eload'; 
$pass = 'Jeleszavak1ketto3';
$db   = 'adatbazis_eload';

// Kapcsolódás a MySQL-hez
$conn = new mysqli($host, $user, $pass, $db);
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    die("Kapcsolódási hiba: " . $conn->connect_error);
}

// --- 2. SQL FÁJL BEOLVASÁSA ---
$sql_file = 'vizszerelok.sql'; // Itt hivatkozunk a különálló SQL fájlra

if (!file_exists($sql_file)) {
    die("Hiba: A $sql_file nem található a szerveren!");
}

$sql_content = file_get_contents($sql_file);

// --- 3. SQL PARANCSOK FUTTATÁSA ---
// A multi_query azért kell, mert az SQL fájl több utasítást (CREATE, INSERT) tartalmaz
if ($conn->multi_query($sql_content)) {
    // Végig kell pörgetni a lefutott lekérdezéseket a hiba nélküli befejezéshez
    do {
        if ($result = $conn->store_result()) {
            $result->free();
        }
    } while ($conn->more_results() && $conn->next_result());
    
    echo "<h2 style='color:green;'>Sikeres adatbázis importálás!</h2>";
    echo "<p>A táblák és az adatok sikeresen létrejöttek a <b>$sql_file</b> alapján.</p>";
    echo "<p style='color:red;'>Biztonsági okokból kérlek, töröld az import.php és vizszerelok.sql fájlokat a szerverről!</p>";
} else {
    echo "<h2 style='color:red;'>Hiba történt az importálás során:</h2>";
    echo "<p>" . $conn->error . "</p>";
}

$conn->close();
?>