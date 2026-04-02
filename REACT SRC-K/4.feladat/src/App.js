import { useState } from "react";
import KiadásKövető from "./KiadásKövető";
import Kviz from "./Kviz";

function App() {

    // Aktuális SPA oldal
    const [oldal, setOldal] = useState("kiadas");

    return (
        <div>
            <h2 id="spah">SPA menü</h2>
            {/* REACT belső menü (középre igazítva CSS-sel) */}
            <div className="belso-menu">

                <button onClick={() => setOldal("kiadas")}>
                    Kiadás követő
                </button>

                <button onClick={() => setOldal("kviz")}>
                    Kvíz
                </button>

            </div>

            {/* Tartalom */}
            <div id="content">

                {oldal === "kiadas" && <KiadásKövető />}
                {oldal === "kviz" && <Kviz />}

            </div>

        </div>
    );
}

export default App;