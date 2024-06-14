package Controller;

public interface IUsuarioController {
	
	public String login(String username, String contrasena);
	
	public String register(String username, String contrasena, String nombre, String apellidos, String email, double saldo, boolean premium);
	
	public String pedir(String username);
	
	public String restarDinero(String username, double nuevoSaldo);
	
	public String modificar(String username, String nuevaContrasena, String nuevoNombre, String nuevosApellidos, String nuevoEmail, double nuevoSaldo, boolean nuevoPremium);
	
	public String eliminar(String username);
	
}
