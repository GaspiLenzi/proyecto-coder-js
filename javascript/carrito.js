
// En base al array de compradas se genera el html del carrito. Si se cancela una compra de butaca, el objeto sale del carrito

$.getJSON(URL, (data, _estado) => {
	for (const producto of data) {
		arrayButacas.push(new Butaca(producto.precio, producto.tipo, producto.platea, producto.vision, producto.numero, producto.ocupada));
	}
    
    for (const butaca of compradas){
        $("#compradas").append(`
        <div class="divButacas tipo${butaca.tipo}" id="Butaca${butaca.numero}">
        <h2> Butaca ${butaca.numero} </h2>
        <p> Tipo: ${butaca.tipo} </p>
        <p> Platea: ${butaca.platea} </p>
        <p> Visión: ${butaca.vision} </p>
        </div>`)    
    }
})

// Show para formulario final

$('#show').on('click', function () {
    $('.center').show();
    $(this).hide();
})

$('#close').on('click', function () {
    $('.center').hide();
    $('#show').show();
})    