import React, { useState } from "react";
import Form from "./components/Form";
import Tabla from "./components/Tabla";

/*
FŐ KOMPONENS
- adatok kezelése
- CRUD műveletek
*/
function App() {

  // kezdeti adatok (feladat szerint)
  const kezdetiAdatok = [
    { id: 1, telepules: "Kőváros", utca: "Gyimes u. 83." },
    { id: 2, telepules: "Zöldhely", utca: "Bérc u. 96." },
    { id: 3, telepules: "Barackfalva", utca: "Erdőss u. 18." },
    { id: 4, telepules: "Kékség", utca: "Aszú u. 33." },
    { id: 5, telepules: "Kőváros", utca: "Agyag u. 71." },
    { id: 6, telepules: "Kékség", utca: "Csokor u. 4." },
    { id: 7, telepules: "Zöldhely", utca: "Gőz tér 95." },
    { id: 8, telepules: "Sárgahegy", utca: "Főnök u. 55." },
    { id: 9, telepules: "Sárgahegy", utca: "Fenyő u. 24." },
    { id: 10, telepules: "Sárgahegy", utca: "Cselló u. 25." },
    { id: 11, telepules: "Kőváros", utca: "Felvidék u. 64." }
  ];

  const [adatok, setAdatok] = useState(kezdetiAdatok);

  // szerkesztési állapot
  const [szerkesztes, setSzerkesztes] = useState(false);
  const [aktualis, setAktualis] = useState(null);

  // hozzáadás
  const hozzaad = (uj) => {
    uj.id = adatok.length + 1;
    setAdatok([...adatok, uj]);
  };

  // törlés
  const torol = (id) => {
    setAdatok(adatok.filter(a => a.id !== id));
  };

  // szerkesztés indítása
  const szerkeszt = (adat) => {
    setSzerkesztes(true);
    setAktualis(adat);
  };

  // módosítás
  const modosit = (id, frissitett) => {
    setSzerkesztes(false);
    setAdatok(adatok.map(a => (a.id === id ? frissitett : a)));
  };

  return (
      <>


        <div id="content">
          <h2>React CRUD alkalmazás</h2>

          <Form
              hozzaad={hozzaad}
              modosit={modosit}
              szerkesztettElem={aktualis}
              szerkesztes={szerkesztes}
          />

          <h3>Adatok</h3>

          <Tabla
              adatok={adatok}
              torol={torol}
              szerkeszt={szerkeszt}
          />
        </div>

      </>
  );
}

export default App;