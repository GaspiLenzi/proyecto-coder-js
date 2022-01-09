// Mi idea es hacer un simulador de venta de entradas para un teatro/estadio tipo ticketek. Tengo pensado hacer que las butacas se puedan comprar solo si estan disponibles (no ocupadas) y que esto se muestre visualmente de ser posible (mostrar todas las butacas y grisar aquellos espacios ocupados).

//Chequeo DOM

$( document ).ready(function() 
{
   console.log( "El DOM está listo" );
});

// Variables

let arrayButacas = [];

const compradas = []

const URL = "./data/data.json"

// Clase y constructor

class Butaca {
    constructor (precio, tipo, platea, vision, numero, ocupada) {
        this.precio = precio
        this.tipo = tipo
        this.platea = platea
        this.vision = vision
        this.numero = numero
        this.ocupada = ocupada || false
    }

    // Metodos 

    vender () {
        this.ocupada = true
    }

    cancelar () {
        this.ocupada = false
    }

    estaOcupada () {
        if (this.ocupada === true) return true
    }

}

// Ajax

$.getJSON(URL, (data, _estado) => {
	for (const producto of data) {
		arrayButacas.push(new Butaca(producto.precio, producto.tipo, producto.platea, producto.vision, producto.numero, producto.ocupada));
	}
    cargarDom()
    cargarLocalStorage()
});

// Funciones

function cargarDom(){ 
    for (const butaca of arrayButacas){
        $("#layoutButacas").append(`
        <div class="divButacas tipo${butaca.tipo} platea${butaca.platea}" id="Butaca${butaca.numero}">
        <h2> Butaca ${butaca.numero} </h2>
        <p> Platea: ${butaca.platea} </p>
        <i> <b>$${butaca.precio}<b> </i> <button id="comprar${butaca.numero}"> Comprar </button> <button id="cancelar${butaca.numero}"> Cancelar </button>
        </div>`)
    
        $(`#comprar${butaca.numero}`).on("click", () => comprar(butaca))
        $(`#cancelar${butaca.numero}`).on("click", () => cancelar(butaca))
    }
}

function comprar (butaca) {
    const butacaOcupada = compradas.find(el => el.numero === butaca.numero)
    if (butacaOcupada) {
        alert("Esta butaca ya se encuentra ocupada")
    } else {
        butaca.vender()
        pintarOcupada(butaca)
        compradas.push(butaca)
        console.log(compradas)
        let butacaString = JSON.stringify(compradas)
        sessionStorage.setItem("butaca", butacaString)
    }
}

function cancelar (butaca) {
    const butacaEncontrada = compradas.find(el => el.numero === butaca.numero)
    if (butacaEncontrada) {
        butacaEncontrada.cancelar()
        const index = compradas.indexOf(butacaEncontrada)
        compradas.splice(index, 1)
        $(`#Butaca${butacaEncontrada.numero}`).css('backgroundColor','#e3fadc')
        $(`#Butaca${butacaEncontrada.numero}`).css('textDecoration','none')
        let butacaString = JSON.stringify(compradas)
        sessionStorage.setItem("butaca", butacaString)

    } else {
       alert("Esta butaca no esta comprada")
    }
}

function pintarOcupada(butaca){
    $(`#Butaca${butaca.numero}`).css('backgroundColor','gray')
    $(`#Butaca${butaca.numero}`).css('textDecoration','line-through')
}

function cargarLocalStorage(){
    let butacaString = sessionStorage.getItem("butaca")
    let butacasParse = JSON.parse(butacaString)
    if(butacasParse){
        for(const butaca of butacasParse){
            compradas.push(new Butaca(butaca.precio, butaca.tipo, butaca.platea, butaca.vision, butaca.numero, butaca.ocupada))
            pintarOcupada(butaca)
        }
    }
}

// Animaciones para filtros

$("#bTodas").on("click", () => $(".divButacas").show())

$("#bComun").on("click", function() {
    $(".divButacas").hide()
    $(".tipoComun").show()
})

$("#bPremium").on("click", function() {
    $(".divButacas").hide()
    $(".tipoPremium").show()
})

$("#bVip").on("click", function() {
    $(".divButacas").hide()
    $(".tipoVIP").show()
})
