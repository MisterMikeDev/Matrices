let MATRIX = Array(3)
    .fill(0)
    .map(() =>
        Array(3)
            .fill(0)
            .map(() => createRandomNumber())
    );

const $ = (s: string) => document.querySelector(s);
const $form = $("form#createMatrix") as HTMLFormElement;
const $matrix = $("div.matrix-container") as HTMLDivElement;
const $btnDiagonals = $("button#calc-diagonals") as HTMLButtonElement;
const $btnOdd = $("button#calc-odd") as HTMLButtonElement;
const $btnPeers = $("button#calc-peers") as HTMLButtonElement;
const $textDiagonalsLeft = $("b#sum-left") as HTMLSpanElement;
const $textDiagonalsRight = $("b#sum-right") as HTMLSpanElement;

function createRandomNumber(min = 0, max = 9) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createCeil() {
    const ceil = document.createElement("div");
    ceil.classList.add("ceil");
    return ceil;
}

function createRow() {
    const row = document.createElement("div");
    row.classList.add("row");
    return row;
}

function createTable(size = 3) {
    $matrix.innerHTML = "";
    console.time("createTable");
    MATRIX = Array(size)
        .fill(0)
        .map(() =>
            Array(size)
                .fill(0)
                .map(() => createRandomNumber())
        );
    console.timeEnd("createTable");

    MATRIX.forEach((rowTable, x) => {
        const row = createRow();
        rowTable.forEach((ceilTable, y) => {
            const $ceil = createCeil();
            $ceil.classList.add("ceil");
            $ceil.textContent = ceilTable.toString();
            $ceil.setAttribute("data-x", x.toString());
            $ceil.setAttribute("data-y", y.toString());
            row.appendChild($ceil);
        });
        $matrix.appendChild(row);
    });

    return $matrix;
}

function calcDiagonals() {
    let diagonalsLtR = 0,
        diagonalsRtL = 0;

    MATRIX.forEach((rows, x) => {
        rows.forEach((ceil, y) => {
            if (x === y) {
                diagonalsLtR += ceil;
            }
            if (x + y === MATRIX.length - 1) {
                diagonalsRtL += ceil;
            }
        });
    });
    return {
        diagonalsLtR,
        diagonalsRtL
    };
}

function calcOdds() {
    let odds = 0;

    MATRIX.forEach((rows) => {
        rows.forEach((ceil) => {
            if (ceil % 2 !== 0) {
                odds += ceil;
            }
        });
    });
    return {
        odds
    };
}

function calcPeers() {
    let peers = 0;

    MATRIX.forEach((rows) => {
        rows.forEach((ceil) => {
            if (ceil % 2 === 0) {
                peers += ceil;
            }
        });
    });
    return {
        peers
    };
}

$form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData($form);
    const size = Number(data.get("ceils") ?? 3);

    console.log(size);

    if (size < 2 || size > 700 || isNaN(size)) {
        return alert("El valor ingresado no es valido");
    }

    try {
        const tableMatrix = createTable(size);
        $matrix.appendChild(tableMatrix);
    } catch {}
});

$btnDiagonals.addEventListener("click", (e) => {
    e.preventDefault();
    const { diagonalsLtR, diagonalsRtL } = calcDiagonals();
    $textDiagonalsLeft.innerText = String(diagonalsLtR);
    $textDiagonalsRight.innerText = String(diagonalsRtL);
});

$btnOdd.addEventListener("click", (e) => {
    e.preventDefault();
    const { odds } = calcOdds();
    alert(`La suma de los numeros impares de toda la matriz es: ${odds}`);
});

$btnPeers.addEventListener("click", (e) => {
    e.preventDefault();
    const { peers } = calcPeers();
    alert(`La suma de los numeros pares de toda la matriz es: ${peers}`);
});

window.addEventListener("DOMContentLoaded", () => {
    try {
        $matrix.appendChild(createTable());
    } catch {}
});
