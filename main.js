let pantalla = document.getElementById("pantalla");
let operacion = "";
let valor1 = null;

function agregarValor(valor) {
    pantalla.value += valor;
}

function operar(operador) {
    if (valor1 === null) {
        valor1 = parseFloat(pantalla.value);
        operacion = operador;
        pantalla.value = "";
    }
}

function calcular() {
    let valor2 = parseFloat(pantalla.value);
    if (operacion === "+") {
        pantalla.value = valor1 + valor2;
    } else if (operacion === "-") {
        pantalla.value = valor1 - valor2;
    } else if (operacion === "*") {
        pantalla.value = valor1 * valor2;
    } else if (operacion === "/") {
        pantalla.value = valor1 / valor2;
    }
    valor1 = null;
    operacion = "";
}

function limpiar() {
    pantalla.value = "";
    valor1 = null;
    operacion = "";
}
