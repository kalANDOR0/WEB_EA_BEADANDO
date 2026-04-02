import React, { useState, useEffect } from "react";

/*
Űrlap komponens
- új adat hozzáadás
- meglévő adat szerkesztés
*/
const Form = ({ hozzaad, modosit, szerkesztettElem, szerkesztes }) => {

    // állapot: aktuális űrlap adatok
    const [adat, setAdat] = useState({
        telepules: "",
        utca: ""
    });

    // ha szerkesztünk, betöltjük az adatot
    useEffect(() => {
        if (szerkesztettElem) {
            setAdat(szerkesztettElem);
        }
    }, [szerkesztettElem]);

    // input változás kezelése
    const valtozas = (e) => {
        const { name, value } = e.target;
        setAdat({ ...adat, [name]: value });
    };

    // mentés
    const kuldes = (e) => {
        e.preventDefault();

        if (!adat.telepules || !adat.utca) {
            alert("Minden mezőt ki kell tölteni!");
            return;
        }

        if (szerkesztes) {
            modosit(adat.id, adat);
        } else {
            hozzaad(adat);
        }

        // reset
        setAdat({ telepules: "", utca: "" });
    };

    return (
        <form onSubmit={kuldes}>
            <label>Település</label><br />
            <input name="telepules" value={adat.telepules} onChange={valtozas} /><br />

            <label>Utca</label><br />
            <input name="utca" value={adat.utca} onChange={valtozas} /><br />

            <button>{szerkesztes ? "Módosítás" : "Hozzáadás"}</button>
        </form>
    );
};

export default Form;