package Controller;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import Connection.DBConnection;
import Modelos.Compra;

public class CompraController implements ICompraController{

	@Override
	public String listarCompras(String username, boolean ordenar, String orden) {
		
		Gson gson = new Gson();
		DBConnection con = new DBConnection();
		
		String sql = "SELECT j.id, j.imagen, j.titulo, c.fecha, j.precio, c.username FROM juegos j " 
				+ "JOIN compra c ON j.id = c.id "
				+ "JOIN usuarios u ON c.username = u.username "
				+ "WHERE c.username = '" + username + "'";
		
		if(ordenar == true) {
			sql += " ORDER BY fecha " + orden;
		}
		
		List<String> compras = new ArrayList<String>();
		
		try {
			Statement st = con.getConnection().createStatement();
			ResultSet rs = st.executeQuery(sql);
			
			while (rs.next()) {
				int id = rs.getInt("id");
				String titulo = rs.getString("titulo");
				Date fecha = rs.getDate("fecha");
				Double precio = rs.getDouble("precio");
				String imagen = rs.getString("imagen");
				
				Compra compra = new Compra (id, titulo, fecha, precio, imagen);
				
				compras.add(gson.toJson(compra));
				
			}
			
		} catch (Exception ex){
			System.out.println(ex.getMessage());
		} finally {
			con.desconectar();
		}
		
		return gson.toJson(compras);
	}

}
