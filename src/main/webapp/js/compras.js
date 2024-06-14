var username = new URL(location.href).searchParams.get("username");
var user;
var juego2;

$(document).ready(function() {
	
	$(function(){
		$('[data-toggle="tooltip"]').tooltip();
	});
	
	$("#link-to-home").attr("href", "home.html?username=" + username);
	$("#mis-pedidos-btn").attr("href", "compras.html?username=" + username);
	$("#carrito-btn").attr("href", "carrito.html?username=" + username);
	$("#mi-perfil-btn").attr("href", "profile.html?username=" + username);
	
	getUsuario().then(function() {
		
		$("#user-saldo").html(user.saldo.toFixed(2) + "€");
		
        getCompras(username, false, "ASC");
        
        $("#ordenar-fecha").click(ordenarLibros);
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

function getCompras(username, ordenar, orden){
	
	$.ajax({
		type:"GET",
		dataType:"html",
		url:"./ServletComprasListar",
		data:$.param({
			username: username,
			ordenar: ordenar,
			orden: orden
		}),
		success: function(result){
			let parsedResult = JSON.parse(result);
			
			if(parsedResult != false) {
				mostrarHistorial(parsedResult);
			} else {
				console.log("Error recuperando datos de compras");
			}
		}
	});
}

function mostrarHistorial(juegos) {
    let contenidoCompras = "";

    if (juegos.length >= 1) {
        $.each(juegos, function(index, juego) {
            juego = JSON.parse(juego);
            let precioFinal;

            if (juego.precio == 0) {
                precioFinal = 'Free to Play';
            } else {
                if (user.premium) {
                    precioFinal = (juego.precio * 0.5).toFixed(2) + '€';
                } else {
                    precioFinal = juego.precio + '€';
                }
            }
            
            $("#info-username").html(user.username);
            $("#username-label").html(user.username);

            contenidoCompras += '<tr>';
            contenidoCompras += '<td><img src="img/caratulas_juegos/' + juego.imagen + '"></td>';
            contenidoCompras += '<td>' + juego.titulo + '</td>';
            contenidoCompras += '<td>' + precioFinal + '</td>';
            contenidoCompras += '<td>' + juego.fecha + '</td>';
            contenidoCompras += '</tr>';
        });

        $("#historial-tbody").html(contenidoCompras);
        $("#historial-table").removeClass("d-none");
        $("#historial-vacio").addClass("d-none");
    } else {
        $("#historial-vacio").removeClass("d-none");
        $("#historial-table").addClass("d-none");
    }
}

function ordenarLibros(){
	
	if ($("#icono-ordenar").hasClass("fa-sort")){
		getCompras(username, true, "ASC");
		$("#icono-ordenar").removeClass("fa-sort");
		$("#icono-ordenar").addClass("fa-sort-down");
	} else if ($("#icono-ordenar").hasClass("fa-sort-down")) {
		getCompras(username, true, "DESC");
		$("#icono-ordenar").removeClass("fa-sort-down");
		$("#icono-ordenar").addClass("fa-sort-up");
	} else if ($("#icono-ordenar").hasClass("fa-sort-up")) {
		getCompras(username, false, "ASC");
		$("#icono-ordenar").removeClass("fa-sort-up");
		$("#icono-ordenar").addClass("fa-sort");
	}
}
