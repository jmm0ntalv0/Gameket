var username = new URL(location.href).searchParams.get("username");
var busqueda = new URL(location.href).searchParams.get("busqueda");
var user;

$(document).ready(function() {
	
	$("#link-to-home").attr("href", "home.html?username=" + username);
	
	$("#btn-busqueda").on("click", function() {
	    let busqueda = $("#busqueda-input").val();
	    $("#btn-busqueda").attr("href", "buscar.html?username=" + username + "&busqueda=" + encodeURIComponent(busqueda))
	});

	getUsuario().then(function() {

		$("#mis-pedidos-btn").attr("href", "compras.html?username=" + username);

		$("#carrito-btn").attr("href", "carrito.html?username=" + username);

		$("#mi-perfil-btn").attr("href", "profile.html?username=" + username);
		
		$("#username-label").html(user.username);
		
		$("#buscar-juego-vacio").html('No se han encontrado resultados para: "' + busqueda + '"');
		
		getJuegos();

	});
});

async function getUsuario(){
	await $.ajax({
		type:"GET",
		dataType:"html",
		url:"./ServletUsuarioPedir",
		data:$.param({
			username: username
		}),
		success: function(result){
			let parsedResult = JSON.parse(result);
			
			if(parsedResult != false) {
				user = parsedResult;
			} else {
				console.log("Error recuperando datos");
			}
		}
	});
}

function getJuegos(){
	$.ajax({
		type:"GET",
		dataType:"html",
		url:"./ServletJuegoListarBusqueda",
		data:$.param({
			busqueda: busqueda
		}),
		success: function(result){
			let parsedResult = JSON.parse(result);
			
			if(parsedResult != false) {
				mostrarJuegos(parsedResult);
			} else {
				console.log("Error recuperando datos de los juegos");
			}
		}
	});
}

function mostrarJuegos(juegos) {
	let contenido = "";

	$.each(juegos, function(index, juego) {
		juego = JSON.parse(juego);
		
		if(juegos.length >= 3) {
			$("#buscar-juego-vacio").addClass("d-none");
			contenido += '<div id="juego-container" class="col-md-4 mb-4">';
		} else if(juegos.length == 2) {
			$("#buscar-juego-vacio").addClass("d-none");
			contenido += '<div id="juego-container" class="col-md-6 mb-4">';
		} else if(juegos.length == 1) {
			$("#buscar-juego-vacio").addClass("d-none");
			contenido += '<div id="juego-container" class="col-md-12 mb-4">';
		}
		
		contenido += '<div class="card">';
		contenido += '<div class="card-img-container">';
		contenido += '<img src="img/caratulas_juegos/' + juego.imagen + '" class="card-img-top" alt="' + juego.titulo + '">';
		contenido += '</div>';
		contenido += '<div class="card-body">';
		contenido += '<h5 class="card-title" title="' + juego.titulo + '"><a id="comprar-juego" href="detalles.html?id=' + juego.id + '&username=' + username + '" >' + juego.titulo + '</a></h5>';
		contenido += '<p id="genero" class="card-text" title="' + juego.genero1 + ' / ' + juego.genero2 + '">' + juego.genero1 + ' / ' + juego.genero2 + '</p>';
		contenido += '<p id="nombre-empresa" class="card-text" title="' + juego.empresa + '">' + juego.empresa + '</p>';
		
		if (user.premium && juego.precio > 0){
			contenido += '<span><img id="img-descuento" src="img/img-descuento.png"><span id="texto-descuento">' + juego.precio + '€</span></span>'
		}
		
		contenido += '<p id="precio" class="card-text">';
	
		if (juego.precio == 0) {
			contenido += 'Free to Play';
		} else {
			if (user.premium){
				contenido += (juego.precio * 0.5).toFixed(2) + '€';
			} else
				contenido += juego.precio + '€';
		}
	
		contenido += '</p>';
		contenido += '</div></div></div>';
	});

	$("#juegos-grid").html(contenido);
}
