import { useState } from "react";

// Kérdések tömbje
const kerdesek = [
    {
        kerdes: "Mennyi 2 + 2?",
        valaszok: ["3", "4", "5"],
        helyes: "4"
    },
    {
        kerdes: "Mi Magyarország fővárosa?",
        valaszok: ["Debrecen", "Budapest", "Szeged"],
        helyes: "Budapest"
    },
    {
        kerdes: "A React egy?",
        valaszok: ["Framework", "Library", "Adatbázis"],
        helyes: "Library"
    }
];

function Kviz() {

    // Aktuális kérdés indexe
    const [index, setIndex] = useState(0);

    // Pontszám
    const [pont, setPont] = useState(0);

    // Vége van-e a kvíznek
    const [vege, setVege] = useState(false);

    // Válasz kezelés
    function valasz(valasztott) {

        // Ha helyes a válasz → pont növelése
        if (valasztott === kerdesek[index].helyes) {
            setPont(pont + 1);
        }

        // Következő kérdés vagy vége
        if (index + 1 < kerdesek.length) {
            setIndex(index + 1);
        } else {
            setVege(true);
        }
    }

    // Újrakezdés
    function ujra() {
        setIndex(0);
        setPont(0);
        setVege(false);
    }

    // Ha vége a kvíznek
    if (vege) {
        return (
            <div>
                <h2>Kvíz vége!</h2>
                <p>Pontszám: {pont} / {kerdesek.length}</p>

                <button onClick={ujra}>
                    Újrakezdés
                </button>
            </div>
        );
    }

    // Normál nézet
    return (
        <div>

            <h2>Kvíz</h2>

            {/* Kérdés */}
            <p>{kerdesek[index].kerdes}</p>

            {/* Válaszok */}
            {kerdesek[index].valaszok.map((v, i) => (
                <button key={i} onClick={() => valasz(v)}>
                    {v}
                </button>
            ))}

        </div>
    );
}

export default Kviz;