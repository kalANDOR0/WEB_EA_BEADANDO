// Adatok tömbben
// Ebben tároljuk a szerelők adatait
let szerelok = [
    {az:1, nev:"Tornyos Pál", kezdev:1979},
    {az:2, nev:"Kormos István", kezdev:1981},
    {az:3, nev:"Fodor László", kezdev:1983},
    {az:4, nev:"Szabó Mihály", kezdev:1975},
    {az:5, nev:"Szabó György", kezdev:2000},
    {az:6, nev:"Erdei Imre", kezdev:1988}
];

// Ez tárolja, hogy melyik rekordot szerkesztjük
// -1 esetén új rekordot hozunk létre
let szerkesztIndex = -1;


// Táblázat frissítése
// Újra felépíti a táblázat HTML tartalmát a tömb alapján
function tablaFrissit(){

    let html = "";

    // Végigmegyünk a szerelők tömbön
    for(let i=0;i<szerelok.length;i++){

        html += `
        <tr>
            <td>${szerelok[i].az}</td>
            <td>${szerelok[i].nev}</td>
            <td>${szerelok[i].kezdev}</td>
            <td>
                <button onclick="modosit(${i})">Módosít</button>
                <button onclick="torles(${i})">Törlés</button>
            </td>
        </tr>
        `;
    }

    // A generált HTML-t betöltjük a táblázatba
    document.getElementById("tabla").innerHTML = html;
}


// Mentés (új rekord vagy módosítás)
function ment(){

    let nev = document.getElementById("nev").value.trim();
    let kezdev = document.getElementById("kezdev").value.trim();

    // Ellenőrizzük hogy ki van-e töltve minden
    if(nev === "" || kezdev === ""){
        alert("Minden mezőt ki kell tölteni!");
        return;
    }

    // Új rekord létrehozása
    if(szerkesztIndex === -1){

        // Új azonosító generálása
        let ujAz = szerelok.length + 1;

        szerelok.push({
            az:ujAz,
            nev:nev,
            kezdev:parseInt(kezdev)
        });

    }else{

        // Ha módosítás történik, akkor az azonosítót is lehet szerkeszteni
        let az = document.getElementById("az").value.trim();

        if(az === ""){
            alert("Az azonosító nem lehet üres!");
            return;
        }

        szerelok[szerkesztIndex].az = parseInt(az);
        szerelok[szerkesztIndex].nev = nev;
        szerelok[szerkesztIndex].kezdev = parseInt(kezdev);

        // Visszaállítjuk a szerkesztési módot
        szerkesztIndex = -1;

        // Elrejtjük az azonosító mezőt
        document.getElementById("azContainer").style.display = "none";
    }

    // Input mezők törlése
    document.getElementById("nev").value="";
    document.getElementById("kezdev").value="";
    document.getElementById("az").value="";

    // Táblázat frissítése
    tablaFrissit();
}


// Módosítás
// Betölti az adatokat az input mezőkbe
function modosit(i){

    // Az azonosító mező megjelenítése
    document.getElementById("azContainer").style.display = "block";

    document.getElementById("az").value = szerelok[i].az;
    document.getElementById("nev").value = szerelok[i].nev;
    document.getElementById("kezdev").value = szerelok[i].kezdev;

    szerkesztIndex = i;
}


// Rekord törlése
function torles(i){

    if(confirm("Biztos törlöd?")){

        szerelok.splice(i,1);

        tablaFrissit();
    }
}


// Oldal betöltésekor megjelenítjük az adatokat
window.onload = tablaFrissit;