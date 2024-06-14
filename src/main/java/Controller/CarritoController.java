package Controller;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import Connection.DBConnection;
import Modelos.Carrito;

public class CarritoController implements ICarritoController{

	@Override
	public String listarAlquileres(String username) {

		Gson gson = new Gson();
		DBConnection con = new DBConnection();
		
		String sql = "SELECT j.id, j.titulo, c.fecha, j.precio, c.username FROM juegos j " 
				+ "JOIN carrito c ON j.id = c.id "
				+ "JOIN usuarios u ON c.username = u.username "
				+ "WHERE c.username = '" + username + "'";
		
		List<String> alquileres = new ArrayList<String>();
		
		try {
			Statement st = con.getConnection().createStatement();
			ResultSet rs = st.executeQuery(sql);
			
			while (rs.next()) {
				int id = rs.getInt("id");
				String titulo = rs.getString("titulo");
				Date fecha = rs.getDate("fecha");
				Double precio = rs.getDouble("precio");
				
				Carrito alquiler = new Carrito (id, titulo, fecha, precio);
				
				alquileres.add(gson.toJson(alquiler));
				
			}
			
		} catch (Exception ex){
			System.out.println(ex.getMessage());
		} finally {
			con.desconectar();
		}
		
		return gson.toJson(alquileres);
	}

	@Override
	public String borrar(int id, String username) {

		DBConnection con = new DBConnection();
		
		String sql = "DELETE FROM carrito WHERE id = " + id + " AND username = '" + username + "' LIMIT 1";
		
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

}
