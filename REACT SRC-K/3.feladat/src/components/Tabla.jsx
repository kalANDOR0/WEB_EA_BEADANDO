import React from "react";

/*
Táblázat komponens
- lista megjelenítése
- törlés / szerkesztés gombok
*/
const Tabla = ({ adatok, torol, szerkeszt }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Az</th>
                <th>Település</th>
                <th>Utca</th>
                <th>Művelet</th>
            </tr>
            </thead>

            <tbody>
            {adatok.map(adat => (
                <tr key={adat.id}>
                    <td>{adat.id}</td>
                    <td>{adat.telepules}</td>
                    <td>{adat.utca}</td>
                    <td>
                        <button onClick={() => szerkeszt(adat)}>Szerkeszt</button>
                        <button onClick={() => torol(adat.id)}>Törlés</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Tabla;