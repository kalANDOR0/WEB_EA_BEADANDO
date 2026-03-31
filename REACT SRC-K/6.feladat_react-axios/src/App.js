import './style.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

    // ---------------- STATE ----------------
    const [adatok, setAdatok] = useState([]);

    const [azonosito, setAzonosito] = useState("");
    const [nev, setNev] = useState("");
    const [kezdev, setKezdev] = useState("");

    const [hiba, setHiba] = useState("");
    const [szerkesztes, setSzerkesztes] = useState(false);

    const apiUrl = "http://odjxa8gehvjl.nhely.hu/api.php";

    // ---------------- GET ----------------
    const adatokLekerdezese = () => {
        axios.get(apiUrl)
            .then(res => setAdatok(res.data))
            .catch(() => setHiba("Hiba az adatok betöltésekor!"));
    };

    useEffect(() => {
        adatokLekerdezese();
    }, []);

    // ---------------- VALIDÁCIÓ ----------------
    const ellenorzes = () => {

        if (!azonosito) {
            return "Az azonosító kötelező!";
        }

        if (isNaN(azonosito)) {
            return "Az azonosító csak szám lehet!";
        }

        if (!nev.trim()) {
            return "A név nem lehet üres!";
        }

        if (!kezdev) {
            return "A kezdési év kötelező!";
        }

        if (isNaN(kezdev)) {
            return "A kezdési év csak szám lehet!";
        }

        if (kezdev < 1900 || kezdev > 2099) {
            return "A kezdési év 1990 és 2099 között kell legyen!";
        }

        return "";
    };

    // ---------------- MENTÉS (POST / PUT) ----------------
    const mentes = () => {

        const hibaUzenet = ellenorzes();

        if (hibaUzenet) {
            setHiba(hibaUzenet);
            return;
        }

        setHiba("");

        const adat = {
            az: azonosito,
            nev: nev,
            kezdev: kezdev
        };

        const keres = szerkesztes
            ? axios.put(apiUrl, adat)
            : axios.post(apiUrl, adat);

        keres
            .then(() => {
                adatokLekerdezese();
                formTorles();
            })
            .catch(() => {
                setHiba("Hiba mentés közben!");
            });
    };

    // ---------------- TÖRLÉS ----------------
    const torles = (az) => {

        if (!window.confirm("Biztosan törlöd?")) return;

        axios.delete(apiUrl, {
            data: { az: az }
        })
            .then(() => adatokLekerdezese())
            .catch(() => setHiba("Hiba törlés közben!"));
    };

    // ---------------- SZERKESZTÉS ----------------
    const szerkeszt = (elem) => {
        setAzonosito(elem.az);
        setNev(elem.nev);
        setKezdev(elem.kezdev);
        setSzerkesztes(true);
    };

    // ---------------- FORM RESET ----------------
    const formTorles = () => {
        setAzonosito("");
        setNev("");
        setKezdev("");
        setSzerkesztes(false);
    };

    // ---------------- UI ----------------
    return (
        <div>

            <nav id="menu">
                <a href="../index.html">Home</a>
                <a href="../javascript.html">Javascript</a>
                <a href="../react-app/react.html">React</a>
                <a href="../react-spa/build/index.html">SPA</a>
                <a href="../fetchapi.html">Fetch API</a>
                <a href="./react-axios/index.html">Axios</a>
                <a href="../oojs.html">OOJS</a>
            </nav>

            <div id="content">

                <h1>Axios CRUD App</h1>

                {/* HIBA */}
                {hiba && (
                    <div style={{ color: "red", fontWeight: "bold" }}>
                        {hiba}
                    </div>
                )}

                {/* FORM */}
                <div>

                    <input
                        placeholder="Azonosító"
                        value={azonosito}
                        readOnly={szerkesztes}
                        onChange={(e) => setAzonosito(e.target.value)}
                    />
                    <br />

                    <input
                        placeholder="Név"
                        value={nev}
                        onChange={(e) => setNev(e.target.value)}
                    />
                    <br />

                    <input
                        placeholder="Kezdési év"
                        value={kezdev}
                        onChange={(e) => setKezdev(e.target.value)}
                    />
                    <br />

                    <button onClick={mentes}>
                        {szerkesztes ? "Módosítás" : "Hozzáadás"}
                    </button>

                    <button onClick={formTorles}>
                        Mégse
                    </button>
                </div>

                <hr />

                {/* TÁBLA */}
                <table>
                    <thead>
                    <tr>
                        <th>Azonosító</th>
                        <th>Név</th>
                        <th>Kezdési év</th>
                        <th>Műveletek</th>
                    </tr>
                    </thead>

                    <tbody>
                    {adatok.map((elem) => (
                        <tr key={elem.az}>
                            <td>{elem.az}</td>
                            <td>{elem.nev}</td>
                            <td>{elem.kezdev}</td>
                            <td>
                                <button onClick={() => szerkeszt(elem)}>
                                    Szerkeszt
                                </button>

                                <button onClick={() => torles(elem.az)}>
                                    Törlés
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default App;