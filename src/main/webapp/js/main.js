var username = new URL(location.href).searchParams.get("username");
var id_juego = new URL(location.href).searchParams.get("id");
var user;

$(document).ready(function(){
	
	$("#noticia1").attr("href", "noticia.html?noticia=1");
	$("#noticia2").attr("href", "noticia.html?noticia=2");
	$("#noticia3").attr("href", "noticia.html?noticia=3");
	
	$("#gameKetLink").click(function(event){
        event.preventDefault();
        getJuegos(false, "ASC");
    });
    
    $("#btn-busqueda").on("click", function() {
	    let busqueda = $("#busqueda-input").val();
	    $("#btn-busqueda").attr("href", "buscar.html?username=" + username + "&busqueda=" + encodeURIComponent(busqueda))
	});
	
	$(function(){
		$('[data-toggle="tooltip"]').tooltip();
	});
	
	getUsuario().then(function(){
		
		$("#mis-pedidos-btn").attr("href", "compras.html?username=" + username);
		$("#carrito-btn").attr("href", "carrito.html?username=" + username);
		$("#mi-perfil-btn").attr("href", "profile.html?username=" + username);
		$("#all-juegos-link").attr("href", "lista.html?username=" + username);
		$("#btn-to-profile").attr("href", "profile.html?username=" + username);
		
		$("#cat-imagen1").attr("href", "categoria.html?username=" + username + "&categoria=Acción");
		$("#cat-imagen2").attr("href", "categoria.html?username=" + username + "&categoria=FPS");
		$("#cat-imagen3").attr("href", "categoria.html?username=" + username + "&categoria=Multijugador");
		$("#cat-imagen4").attr("href", "categoria.html?username=" + username + "&categoria=Simulación");
		$("#cat-imagen5").attr("href", "categoria.html?username=" + username + "&categoria=Deportes");
		$("#cat-imagen6").attr("href", "categoria.html?username=" + username + "&categoria=Supervivencia");
		
		getJuegos(false, "ASC");
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
				
				if (!user.premium) {
                    $("#premium-label-container").removeClass("d-none");
                }
			} else {
				console.log("Error recuperando datos");
			}
		}
	});
}

function getJuegos(ordenar, orden){
	$.ajax({
		type:"GET",
		dataType:"html",
		url:"./ServletJuegoListarAleatorio",
		data:$.param({
			ordenar: ordenar,
			orden: orden
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
	
		contenido += '<div id="juego-container" class="col-md-4 mb-4">';
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
			} else {
				contenido += juego.precio + '€';
			}
		}
	
		contenido += '</p>';
		contenido += '</div></div></div>';
		
		$("#username-label").html(user.username);
	});

	$("#juegos-grid").html(contenido);
}
