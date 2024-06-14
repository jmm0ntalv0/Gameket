package Controller;

import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import java.sql.Date;
import java.sql.ResultSet;

import Connection.DBConnection;
import Modelos.Comentario;

public class ComentarioController implements IComentarioController{

	@Override
	public String publicarComentario(int id, String username, String texto, boolean recomendacion) {

		Date fecha = new Date(System.currentTimeMillis());
		Gson gson = new Gson();
		DBConnection con = new DBConnection();
		
		String sql = "INSERT INTO comentarios VALUES ('" + id + "', '" + username + "', '" + texto + "', '" + fecha + "', " + recomendacion + ")";

		try {
			Statement st = con.getConnection().createStatement();
			st.executeQuery(sql);

			Comentario comentario = new Comentario(id, username, texto, fecha, recomendacion);

			st.close();

			return gson.toJson(comentario);
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		} finally {
			con.desconectar();
		}

		return "false";
	}

	@Override
	public String listar(int id) {
		
		Gson gson = new Gson();
		DBConnection con = new DBConnection();
		
		String sql = "SELECT c.texto, c.fecha, c.recomendacion, u.username FROM comentarios c " 
				+ "JOIN usuarios u ON c.username = u.username "
				+ "JOIN juegos j ON c.id = j.id "
				+ "WHERE j.id = " + id;
		
		List<String> comentarios = new ArrayList<>();
		
		try {
			Statement st = con.getConnection().createStatement();
			ResultSet rs = st.executeQuery(sql);
			
			while (rs.next()) {
				String texto = rs.getString("texto");
				Date fecha = rs.getDate("fecha");
				boolean recomendacion = rs.getBoolean("recomendacion");
				String username = rs.getString("username");
				
				Comentario comentario = new Comentario (id, username, texto, fecha, recomendacion);
				
				comentarios.add(gson.toJson(comentario));
				
			}
			
		} catch (Exception ex){
			System.out.println(ex.getMessage());
		} finally {
			con.desconectar();
		}
		
		return gson.toJson(comentarios);
	}

}
