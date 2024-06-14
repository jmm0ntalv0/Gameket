package Controller;

import java.sql.ResultSet;
import java.sql.Statement;

import com.google.gson.Gson;

import Connection.DBConnection;
import Modelos.Usuario;

public class UsuarioController implements IUsuarioController{

	@Override
	public String login(String username, String contrasena) {
		
		Gson gson = new Gson();
		DBConnection con = new DBConnection();
		String sql = "SELECT * FROM usuarios WHERE username = '" + username + "' AND contrasena = '" + contrasena + "'";
		
		try {
			
			Statement st = con.getConnection().createStatement();
			ResultSet rs = st.executeQuery(sql);
			
			while(rs.next()) {
				String nombre = rs.getString("nombre");
				String apellidos = rs.getString("apellidos");
				String email = rs.getString("email");
				double saldo = rs.getDouble("saldo");
				boolean premium = rs.getBoolean("premium");
				
				Usuario usuario = new Usuario(username, contrasena, nombre, apellidos, email, saldo, premium);
				return gson.toJson(usuario);
			}
			
		} catch (Exception ex){
			System.out.println(ex.getMessage());
		} finally {
			con.desconectar();
		}
		
		return "false";
	}

	@Override
	public String register(String username, String contrasena, String nombre, String apellidos, String email,
			double saldo, boolean premium) {

		Gson gson = new Gson();
		DBConnection con = new DBConnection();
		String sql = "INSERT INTO usuarios VALUES ('" + username + "', '" + contrasena + "', '" + nombre + "', '" + apellidos + "', '" + email + "', " + saldo + ", " + premium + ")";
		
		try {
			Statement st = con.getConnection().createStatement();
			st.executeQuery(sql);
			
			Usuario usuario = new Usuario(username, contrasena, nombre, apellidos, email, saldo, premium);
			
			st.close();
			
			return gson.toJson(usuario);
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		} finally {
			con.desconectar();
		}

		return "false";
	}

	@Override
	public String pedir(String username) {

		Gson gson = new Gson();
		DBConnection con = new DBConnection();
		
		String sql = "SELECT * FROM usuarios WHERE username='" + username + "' ";
		
		try {
		 	Statement st = con.getConnection().createStatement();
		 	ResultSet rs = st.executeQuery(sql);
		 	
		 	while(rs.next()) {
		 		String contrasena = rs.getString("contrasena");
		 		String nombre = rs.getString("nombre");
				String apellidos = rs.getString("apellidos");
				String email = rs.getString("email");
				double saldo = rs.getDouble("saldo");
				boolean premium = rs.getBoolean("premium");
				
				Usuario usuario = new Usuario(username, contrasena, nombre, apellidos, email, saldo, premium);
				
				return gson.toJson(usuario);
		 	}
			
			
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		} finally {
			con.desconectar();
		}
		
		return "false";
	}

	@Override
	public String restarDinero(String username, double nuevoSaldo) {
		
		DBConnection con = new DBConnection();
		String sql = "UPDATE usuarios SET saldo = " + nuevoSaldo + " WHERE username = '" + username + "'";

		try {
			Statement st = con.getConnection().createStatement();
			st.executeQuery(sql);

			return "true";

		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		} finally {
			con.desconectar();
		}

		return "false";
	}

	@Override
	public String modificar(String username, String nuevaContrasena, String nuevoNombre, String nuevosApellidos,
			String nuevoEmail, double nuevoSaldo, boolean nuevoPremium) {
		
		DBConnection con = new DBConnection();
		String sql = "UPDATE usuarios SET contrasena = '" + nuevaContrasena + "', nombre = '" + nuevoNombre + "', apellidos = '" + nuevosApellidos + "', email = '" + nuevoEmail + "', saldo = " + nuevoSaldo + ", premium = ";
		
		if (nuevoPremium == true) {
			sql += " 1 ";
		}
		else
			sql += " 0 ";
		
		sql += " WHERE username = '" + username + "'";
		
		try {
			Statement st = con.getConnection().createStatement();
			st.executeQuery(sql);

			return "true";

		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		} finally {
			con.desconectar();
		}

		return "false";
	}

	@Override
	public String eliminar(String username) {
		
		DBConnection con = new DBConnection();
		String sql1 = "DELETE FROM carrito WHERE username = '" + username + "'";
		String sql2 = "DELETE FROM compra WHERE username = '" + username + "'";
		String sql3 = "DELETE FROM comentarios WHERE username = '" + username + "'";
		String sql4 = "DELETE FROM usuarios WHERE username = '" + username + "'";
		
		try {
			Statement st = con.getConnection().createStatement();
			st.executeQuery(sql1);
			st.executeQuery(sql2);
			st.executeQuery(sql3);
			st.executeQuery(sql4);
			
			return "true";
			
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		} finally {
			con.desconectar();
		}
		
		return "false";
	}

}
