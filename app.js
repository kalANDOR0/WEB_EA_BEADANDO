// =======================
// ALAP OSZTÁLY
// =======================
class UIElem {
    constructor() {
        this.elem = null; // DOM elem
    }

    // kirajzolás az oldalra
render() {
    document.body.appendChild(this.elem);
}
}

// =======================
// SZÁMOLÓGÉP
// =======================
class Calculator extends UIElem {

    constructor() {
        super();

        // aktuális művelet
        this.kifejezes = "";

        this.letrehoz();
    }

    // =======================
    // FELÜLET
    // =======================
    letrehoz() {

        // külső doboz
        this.elem = document.createElement("div");
        this.elem.className = "calculator";

        // belső doboz
        this.inner = document.createElement("div");
        this.inner.className = "calculator-inner";

        // felső kijelző (művelet)
        this.kifejezesDisplay = document.createElement("input");
        this.kifejezesDisplay.disabled = true;

        // alsó kijelző (eredmény)
        this.eredmenyDisplay = document.createElement("input");
        this.eredmenyDisplay.disabled = true;

        this.inner.appendChild(this.kifejezesDisplay);
        this.inner.appendChild(this.eredmenyDisplay);

        // gomb konténer
        this.buttonContainer = document.createElement("div");
        this.buttonContainer.className = "buttons";

        // gombok
        const gombok = [
            "7","8","9","/",
            "4","5","6","*",
            "1","2","3","-",
            "0",".","=","+",
            "C","←"
        ];

        // gombok létrehozása
        gombok.forEach(gomb => {
            let btn = document.createElement("button");
            btn.innerText = gomb;

            btn.addEventListener("click", () => this.gombKattintas(gomb));

            this.buttonContainer.appendChild(btn);
        });

        this.inner.appendChild(this.buttonContainer);
        this.elem.appendChild(this.inner);
    }

    // =======================
    // GOMBOK KEZELÉSE
    // =======================
    gombKattintas(gomb) {

        // törlés
        if (gomb === "C") {
            this.kifejezes = "";
            this.eredmenyDisplay.value = "";
        }

        // visszatörlés
        else if (gomb === "←") {
            this.kifejezes = this.kifejezes.slice(0, -1);
        }

        // számolás
        else if (gomb === "=") {
            try {
                let eredmeny = eval(this.kifejezes);
                this.eredmenyDisplay.value = eredmeny;
            } catch {
                this.eredmenyDisplay.value = "Hiba";
            }
        }

        // szám vagy művelet hozzáadás
        else {
            this.kifejezes += gomb;
        }

        // felső kijelző frissítés
        this.kifejezesDisplay.value = this.kifejezes;
    }
}

// =======================
// INDÍTÁS
// =======================
const app = new Calculator();
app.render();