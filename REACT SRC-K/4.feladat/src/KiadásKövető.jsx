import { useState } from "react";

function KiadásKövető() {

    // Bevitel mezők állapota
    const [nev, setNev] = useState("");
    const [osszeg, setOsszeg] = useState("");

    // Hibaüzenet
    const [hiba, setHiba] = useState("");

    // Kiadások listája
    const [kiadasok, setKiadasok] = useState([]);

    // Új kiadás hozzáadása
    function hozzaad() {

        // Üres mező ellenőrzés
        if (nev === "" || osszeg === "") {
            setHiba("Minden mezőt ki kell tölteni!");
            return;
        }

        // Szám ellenőrzés
        if (isNaN(osszeg)) {
            setHiba("Az összegnek számnak kell lennie!");
            return;
        }

        const uj = {
            nev: nev,
            osszeg: Number(osszeg)
        };

        // Lista frissítése
        setKiadasok([...kiadasok, uj]);

        // Hiba törlése
        setHiba("");

        // Mezők ürítése
        setNev("");
        setOsszeg("");
    }

    // Törlés
    function torol(index) {
        const ujLista = kiadasok.filter((_, i) => i !== index);
        setKiadasok(ujLista);
    }

    // Összeg kiszámolása
    const osszesen = kiadasok.reduce((sum, elem) => sum + elem.osszeg, 0);

    return (
        <div>

            <h2>Kiadás követő</h2>

            {/* BEVITEL */}
            <input
                placeholder="Megnevezés"
                value={nev}
                onChange={(e) => setNev(e.target.value)}
            />

            <input
                type="number"
                placeholder="Összeg"
                value={osszeg}
                onChange={(e) => setOsszeg(e.target.value)}
            />

            <br />

            <button onClick={hozzaad}>
                Hozzáadás
            </button>

            {/* HIBAÜZENET */}
            {hiba !== "" && (
                <p style={{ color: "red" }}>{hiba}</p>
            )}

            {/* LISTA */}
            {kiadasok.length === 0 ? (
                <p>Nincs még adat</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Név</th>
                        <th>Összeg</th>
                        <th>Művelet</th>
                    </tr>
                    </thead>
                    <tbody>
                    {kiadasok.map((elem, index) => (
                        <tr key={index}>
                            <td>{elem.nev}</td>
                            <td>{elem.osszeg} Ft</td>
                            <td>
                                <button onClick={() => torol(index)}>
                                    Törlés
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* ÖSSZEG */}
            <h3>Összesen: {osszesen} Ft</h3>

        </div>
    );
}

export default KiadásKövető;