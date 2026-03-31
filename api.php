<?php
//A készítés során így localhost react app-ból el lehet érni az adatokat
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

//REACT-AXIOS módosításhoz kell:
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Csatlakozás az adatbázishoz
require_once 'connect.php';

// Beállítjuk, hogy JSON formátumban küldjük vissza a választ
header('Content-Type: application/json; charset=utf-8');

// Beolvassuk a Fetch API által küldött JSON adatokat
$input = json_decode(file_get_contents('php://input'), true);

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
            // READ: Minden szerelő lekérése
            $stmt = $dbh->query("SELECT * FROM szerelo");
            $eredmeny = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($eredmeny);
            break;

        case 'POST':
            // CREATE: Új szerelő hozzáadása (itt módosult: az 'az' mezőt is be kell szúrni)
            $sql = "INSERT INTO szerelo (az, nev, kezdev) VALUES (:az, :nev, :kezdev)";
            $stmt = $dbh->prepare($sql);
            $stmt->execute([
                'az'     => $input['az'],
                'nev'    => $input['nev'], 
                'kezdev' => $input['kezdev']
            ]);
            echo json_encode(['status' => 'sikeres', 'uzenet' => 'Sikeres mentés']);
            break;

        case 'PUT':
            // UPDATE: Meglévő szerelő adatainak módosítása
            $sql = "UPDATE szerelo SET nev = :nev, kezdev = :kezdev WHERE az = :az";
            $stmt = $dbh->prepare($sql);
            $stmt->execute([
                'nev'    => $input['nev'], 
                'kezdev' => $input['kezdev'], 
                'az'     => $input['az']
            ]);
            echo json_encode(['status' => 'sikeres', 'uzenet' => 'Sikeres frissítés']);
            break;

        case 'DELETE':
            // DELETE: Szerelő törlése azonosító alapján
            $sql = "DELETE FROM szerelo WHERE az = :az";
            $stmt = $dbh->prepare($sql);
            $stmt->execute([
                'az' => $input['az']
            ]);
            echo json_encode(['status' => 'sikeres', 'uzenet' => 'Sikeres törlés']);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['status' => 'hiba', 'uzenet' => 'Nem engedélyezett metódus']);
            break;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'hiba', 'uzenet' => $e->getMessage()]);
}
?>