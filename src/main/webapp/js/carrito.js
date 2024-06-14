var username = new URL(location.href).searchParams.get("username");
var user;

$(document).ready(function(){
	
	$("#link-to-home").attr("href", "home.html?username=" + username);
	
	$("#btn-to-lista").attr("href", "lista.html?username=" + username);
	
	getUsuario().then(function(){
		
		$("#user-saldo").html(user.saldo.toFixed(2) + "€");
	
		getAlquiladas(username);
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

function getAlquiladas(username){
	
	$.ajax({
		type:"GET",
		dataType:"html",
		url:"./ServletCarritoListar",
		data:$.param({
			username: username
		}),
		success: function(result){
			let parsedResult = JSON.parse(result);
			
			if(parsedResult != false) {
				mostrarHistorial(parsedResult);
			} else {
				console.log("Error recuperando datos de reservas");
			}
		}
	});
}

function mostrarHistorial(juegos) {
    let contenidoCarrito = "";

    if (juegos.length >= 1) {
        $.each(juegos, function(index, juego) {
            juego = JSON.parse(juego);
            let precioFinal;
            contenidoCarrito += '<tr>' +
            
            '<td>' + juego.titulo + '</td>' +
            '<td>';

            if (juego.precio == 0) {
                contenidoCarrito += 'Free to Play';
                precioFinal = 0;
            } else {
                precioFinal = user.premium ? (juego.precio * 0.5).toFixed(2) : juego.precio;
                contenidoCarrito += precioFinal + '€';
            }

            contenidoCarrito += '</td>';
            
            if (user.saldo >= precioFinal) {
                contenidoCarrito += '<td><button id="comprar-btn" onclick="comprarJuego(' + juego.id + ',' + precioFinal + ');" class="btn btn-success">Comprar</button></td>';
            } else {
				$("#saldo-insuficiente").removeClass("d-none");
                contenidoCarrito += '<td><button id="comprar-btn" onclick="comprarJuego(' + juego.id + ',' + precioFinal + ');" class="btn btn-success" disabled>Comprar</button></td>';
            }

            contenidoCarrito += '<td><button id="borrar-btn" onclick="borrarJuego(' + juego.id + ');" class="btn btn-basic"><img id="btn-papelera" src="img/btn-papelera.png" alt="Borrar"></button></td></tr>';
        });

        $("#historial-tbody").html(contenidoCarrito);
        $("#historial-table").removeClass("d-none");
        $("#historial-vacio").addClass("d-none");
    } else {
		$("#saldo-insuficiente").removeClass("d-none");
        $("#historial-vacio").removeClass("d-none");
        $("#historial-table").addClass("d-none");
    }
}

function borrarJuego(id) {
	
	$.ajax({
		type:"GET",
		dataType:"html",
		url:"./ServletCarritoBorrar",
		data:$.param({
			username: username,
			id: id,
		}),
		success: function(result){
			
			if(result != false) {
				location.reload();
			} else {
				console.log("Error devolviendo el libro");
			}
		}
	});
}

function comprarJuego(id, precioFinal) {
	$.ajax({
		type:"GET",
		dataType:"html",
		url:"./ServletJuegoComprar",
		data:$.param({
			id: id,
			username: username
		}),
		success: function(result){
			let parsedResult = JSON.parse(result);
			
			if(parsedResult != false) {
				restarDinero(precioFinal).then(function(){
					location.reload();
				})
			} else {
				console.log("Error en la reserva del libro");
			}
		}
	});
}


async function restarDinero(precioFinal) {
	await $.ajax({
		type:"GET",
		dataType:"html",
		url:"./ServletUsuarioRestarDinero",
		data:$.param({
			username: username,
			saldo: parseFloat(user.saldo - precioFinal)
		}),
		success: function(result){
			let parsedResult = JSON.parse(result);
			
			if(parsedResult != false) {
				console.log("Saldo actualizado");
			} else {
				console.log("Error en el proceso de pago");
			}
		}
	});
}
