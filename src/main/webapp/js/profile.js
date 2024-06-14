var username = new URL(location.href).searchParams.get("username");
var user;

$(document).ready(function() {
	
	$("#link-to-home").attr("href", "home.html?username=" + username);

	$("#mis-pedidos-btn").attr("href", "compras.html?username=" + username);

	$("#carrito-btn").attr("href", "carrito.html?username=" + username);

	$("#mi-perfil-btn").attr("href", "profile.html?username=" + username);
	
	getUsuario().then(function(){
		$("#user-saldo").html(user.saldo.toFixed(2) + "€");
		$("#username-label").html(user.username);
	});
	
	fillUsuario();
	
	$("#form-modificar").on("submit", function(event){
		event.preventDefault();
		
		modificarUsuario();
	});
	
	$("#aceptar-eliminar-cuenta-btn").click(function(){
		eliminarCuenta().then(function(){
			location.href="index.html";
		})
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
				console.log(user);
			} else {
				console.log("Error recuperando datos");
			}
		}
	});
}

async function fillUsuario(){
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
				
				$("#input-username").val(parsedResult.username);
				$("#input-contrasena").val(parsedResult.contrasena);
				$("#input-nombre").val(parsedResult.nombre);
				$("#input-apellidos").val(parsedResult.apellidos);
				$("#input-email").val(parsedResult.email);
				$("#input-saldo").val(parsedResult.saldo.toFixed(2));
				$("#input-premium").prop("checked", parsedResult.premium);
				
				$("#nombre-usuario-en-grande").html(parsedResult.username);

			} else {
				console.log("Error recuperando datos");
			}
		}
	});
}

function modificarUsuario(){
	
	let username = $("#input-username").val();
	let contrasena = $("#input-contrasena").val();
	let nombre = $("#input-nombre").val();
	let apellidos = $("#input-apellidos").val();
	let email = $("#input-email").val();
	let saldo = $("#input-saldo").val();
	let premium = $("#input-premium").prop('checked');
	
	$.ajax({
		type:"GET",
		dataType:"html",
		url:"./ServletUsuarioModificar",
		data:$.param({
			username: username,
			contrasena: contrasena,
			nombre: nombre,
			apellidos: apellidos,
			email: email,
			saldo: saldo,
			premium: premium,
		}),
		success: function(result){
			
			if(result != false) {
				$("#modificar-error").addClass("d-none");
				$("#modificar-exito").removeClass("d-none");
			} else {
				$("#modificar-error").removeClass("d-none");
				$("#modificar-exito").addClass("d-none");
			}	
			
			setTimeout(function(){
				location.reload();
			}, 3000);
		}
	});
}

async function eliminarCuenta(){
	await $.ajax({
		type:"GET",
		dataType:"html",
		url:"./ServletUsuarioEliminar",
		data:$.param({
			username: username
		}),
		success: function(result){
			
			if(result != false) {
				console.log("Usuario eliminado")
			} else {
				console.log("Error eliminando el usuario");
			}
		}
	});
}
