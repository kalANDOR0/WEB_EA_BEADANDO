<?php
// --- ADATBÁZIS KAPCSOLAT ---
$host = 'localhost';
$user = 'adatbazis_eload'; // A képernyőfotód alapján
$pass = 'Jeleszavak1ketto3'; // Ide írd a jó jelszót!
$db   = 'adatbazis_eload'; // A képernyőfotód alapján

$conn = new mysqli($host, $user, $pass, $db);
$conn->set_charset("utf8mb4"); // Hogy az ékezetek tökéletesek legyenek

if ($conn->connect_error) {
    die("Kapcsolódási hiba: " . $conn->connect_error);
}
?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>Vízvezeték-szerelők</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 40px; background-color: #f8f9fa; color: #333; }
        h1, h2 { color: #0275d8; border-bottom: 2px solid #0275d8; padding-bottom: 10px; display: inline-block; }
        table { border-collapse: collapse; width: 100%; max-width: 800px; margin-bottom: 40px; background: #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #0275d8; color: white; }
        tr:nth-child(even) { background-color: #f2f2f2; }
        tr:hover { background-color: #e9ecef; }
    </style>
</head>
<body>

    <h1>Tiszta Víz Kft. - Rendszer [cite: 52]</h1>

    <h2>Szerelők listája</h2>
    <table>
        <tr>
            <th>Azonosító</th>
            <th>Név [cite: 57]</th>
            <th>Kezdés éve [cite: 58]</th>
        </tr>
        <?php
        $sql = "SELECT az, nev, kezdev FROM szerelo ORDER BY nev ASC";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<tr>
                        <td>" . $row["az"] . "</td>
                        <td>" . $row["nev"] . "</td>
                        <td>" . $row["kezdev"] . "</td>
                      </tr>";
            }
        } else {
            echo "<tr><td colspan='3'>Nincs megjeleníthető adat.</td></tr>";
        }
        ?>
    </table>

    <h2>Munkalapok (Első 10 rekord)</h2>
    <table>
        <tr>
            <th>Dátum [cite: 61]</th>
            <th>Szerelő neve [cite: 57]</th>
            <th>Település [cite: 69]</th>
            <th>Munkaóra [cite: 65]</th>
        </tr>
        <?php
        // Itt összekapcsoljuk a 3 táblát, hogy a számok helyett neveket lássunk
        $sql2 = "SELECT m.bedatum, s.nev, h.telepules, m.munkaora 
                 FROM munkalap m 
                 JOIN szerelo s ON m.szereloaz = s.az 
                 JOIN hely h ON m.helyaz = h.az 
                 ORDER BY m.bedatum ASC 
                 LIMIT 10";
                 
        $result2 = $conn->query($sql2);

        if ($result2->num_rows > 0) {
            while($row = $result2->fetch_assoc()) {
                echo "<tr>
                        <td>" . $row["bedatum"] . "</td>
                        <td>" . $row["nev"] . "</td>
                        <td>" . $row["telepules"] . "</td>
                        <td>" . $row["munkaora"] . " óra</td>
                      </tr>";
            }
        } else {
            echo "<tr><td colspan='4'>Nincs megjeleníthető adat.</td></tr>";
        }
        ?>
    </table>

</body>
</html>
<?php
$conn->close();
?>