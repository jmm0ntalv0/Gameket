var username = new URL(location.href).searchParams.get("username");
var id_juego = new URL(location.href).searchParams.get("id");
var user;

$(document).ready(function(){
	
	$("#link-to-home").attr("href", "home.html?username=" + username);
	
	getUsuario().then(function(){
		getJuegos(false, "ASC");
	});
	
	$("#comment-form").submit(function(event){
		event.preventDefault();
		mostrarDetallesJuegos();
		publicarComentario(id);
		getComentarios(id);
	});
	
	$("#btn-mostrar-comentarios").click(function() {
        getComentarios(id);
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

function getJuegos(ordenar, orden){
	$.ajax({
		type:"GET",
		dataType:"html",
		url:"./ServletJuegoDetalles",
		data:$.param({
			id: id_juego
		}),
		success: function(result){
			let parsedResult = JSON.parse(result);
			
			if(parsedResult != false) {
				mostrarDetallesJuegos(parsedResult);
			} else {
				console.log("Error recuperando datos de los juegos");
			}
		}
	});
}

function mostrarDetallesJuegos(juegos) {
    let contenido = "";
    
    $.each(juegos, function(index, juego) {
        juego = JSON.parse(juego);
        
        $("title").html(juego.titulo);  
		$("#titulo-detalles").html(juego.titulo);       
		$("#trailer-detalles").html(juego.trailer);
		$("#caratula-detalles").html('<img src="img/caratulas_juegos/' + juego.imagen + '">');
		$("#descripcion-detalles").html(juego.descripcion);
		$("#genero1-detalles").html(juego.genero1);
		$("#genero2-detalles").html(juego.genero2);
		$("#empresa-detalles").html('DESARROLLADORA: ' + juego.empresa);
		$("#fecha-detalles").html('AÑO DE LANZAMIENTO: ' + juego.fechaLanzamiento);
		$("#titulo-detalles-compra").html(juego.titulo);
		
		if (juego.precio == 0) {
			contenido += 'Free to Play';
		} else {
			if (user.premium){
				contenido += (juego.precio * 0.5).toFixed(2) + '€';
			} else
				contenido += juego.precio + '€';
		}
		
		$("#precio-detalles").html(contenido);
		$("#btn-comprar").html('<button onclick="alquilarJuego(' + juego.id + ',' + juego.precio + ');" class="btn btn-secondary">Añadir al carrito</button>')
		$("#btn-publicar-comentario").html('<button type="submit" onclick="publicarComentario(' + juego.id + ');" class="btn btn-primary">Publicar</button>')
		$("#btn-mostrar-comentarios").html('<button onclick="getComentarios(' + juego.id + ');" class="btn btn-default"><img id="btn-comentarios" src="img/flecha-abajo.png"></button>')
    	$("#username-label").html(user.username);
    });
}

function alquilarJuego(id, precio) {
	$.ajax({
		type:"GET",
		dataType:"html",
		url:"./ServletJuegoAlquilar",
		data:$.param({
			id: id,
			username: username
		}),
		success: function(result){
			let parsedResult = JSON.parse(result);
			
			if(parsedResult != false) {
				location.reload();
			} else {
				console.log("Error en la reserva del juego");
			}
		}
	});
}

function publicarComentario(id) {
	let texto = $("#comentario-input").val();
	let recomendacion = $("#input-recomendado").prop('checked');
	
	$.ajax({
		type:"GET",
		dataType:"html",
		url:"./ServletComentarioPublicar",
		data:$.param({
			id: id,
            username: username,
            texto: texto,
            recomendacion: recomendacion
		}),
		success: function(result){
			let parsedResult = JSON.parse(result);
			
			if(parsedResult != false) {
				console.log("Comentario publicado");
				location.reload();
			} else {
				console.log("Error al publicar el comentario");
			}
		}
	});
}

function getComentarios(id){
	$.ajax({
		type:"GET",
		dataType:"html",
		url:"./ServletComentarioListar",
		data:$.param({
			id: id
		}),
		success: function(result){
			console.log("Comentarios recibidos:", result);
			let parsedResult = JSON.parse(result);
			
			if(parsedResult != false) {
				mostrarComentarios(parsedResult);
			} else {
				console.log("Error al mostrar los comentarios");
				mostrarMensajeSinComentarios();
			}
		}
	});
}

function mostrarMensajeSinComentarios() {
    $("#comentarios-vacio").removeClass("d-none");
}

function mostrarComentarios(comentarios) {
    console.log("Mostrando comentarios:", comentarios);
    
    $("#btn-mostrar-comentarios").empty();

    if (comentarios.length > 0) {

	    comentarios.forEach(function(comentarioString) {
	        let comentario = JSON.parse(comentarioString);
	        
	        let comentarioDiv = $("<div>");
	        let imagen = $("<img>").attr("src", "img/img-usuario.png").css("max-width", "30px");
	        
	        comentarioDiv.append(imagen);
            comentarioDiv.append($("<span>").text(comentario.username).addClass("comentario-username"));
            comentarioDiv.append($("<span>").text(comentario.recomendacion ? "Recomendado" : "No recomendado").addClass("comentario-recomendacion"));
            comentarioDiv.append($("<span>").text(comentario.fecha).addClass("comentario-fecha"));
            comentarioDiv.append($("<p>").text(comentario.texto).addClass("comentario-texto"));
            comentarioDiv.append("<hr>");
	        
	        $("#comentarios-container").append(comentarioDiv);
	    });
	} else {
        $("#comentarios-vacio").removeClass("d-none");
    }
}

