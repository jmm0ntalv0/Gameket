package Controller;

import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.gson.Gson;

import Connection.DBConnection;
import Modelos.Juego;

public class JuegoController implements IJuegoController{

	@Override
	public String listar(boolean ordenar, String orden) {

		Gson gson = new Gson();
		DBConnection con = new DBConnection();
		
		String sql = "SELECT * FROM juegos";
		
		if(ordenar == true) {
			sql += " ORDER BY genero " + orden;
		}
		
		List<String> juegos = new ArrayList<String>();
		
		try {
			Statement st = con.getConnection().createStatement();
			ResultSet rs = st.executeQuery(sql);
			
			while(rs.next()) {
				int id = rs.getInt("id");
				String titulo = rs.getString("titulo");
				String genero1 = rs.getString("genero1");
				String genero2 = rs.getString("genero2");
				String empresa = rs.getString("empresa");
				String descripcion = rs.getString("descripcion");
				int fechaLanzamiento = rs.getInt("fechaLanzamiento");
				double precio = rs.getDouble("precio");
				String imagen = rs.getString("imagen");
				String trailer = rs.getString("trailer");
				
				Juego juego = new Juego (id, titulo, genero1, genero2, empresa, descripcion, fechaLanzamiento, precio, imagen, trailer);
				
				juegos.add(gson.toJson(juego));
			}
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		} finally {
			con.desconectar();
		}
		
		return gson.toJson(juegos);
	}

	@Override
	public String detalles(int id) {
		
		Gson gson = new Gson();
		DBConnection con = new DBConnection();
		
		String sql = "SELECT * FROM juegos WHERE id = " + id;
		
		List<String> juegos = new ArrayList<String>();
		
		try {
			Statement st = con.getConnection().createStatement();
			ResultSet rs = st.executeQuery(sql);
			
			while(rs.next()) {
				String titulo = rs.getString("titulo");
				String genero1 = rs.getString("genero1");
				String genero2 = rs.getString("genero2");
				String empresa = rs.getString("empresa");
				String descripcion = rs.getString("descripcion");
				int fechaLanzamiento = rs.getInt("fechaLanzamiento");
				double precio = rs.getDouble("precio");
				String imagen = rs.getString("imagen");
				String trailer = rs.getString("trailer");
				
				Juego juego = new Juego (id, titulo, genero1, genero2, empresa, descripcion, fechaLanzamiento, precio, imagen, trailer);
				
				juegos.add(gson.toJson(juego));
			}
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		} finally {
			con.desconectar();
		}
		
		return gson.toJson(juegos);
	}

	@Override
	public String alquilar(int id, String username) {
		
		Timestamp fecha = new Timestamp(new Date().getTime());
		
		DBConnection con = new DBConnection();
		String sql = "INSERT INTO carrito VALUES ('" + id + "', '" + username + "', '" + fecha + "')";
		
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
	public String comprar(int id, String username) {

		Timestamp fecha = new Timestamp(new Date().getTime());
		
		DBConnection con = new DBConnection();
		String sql = "INSERT INTO compra VALUES ('" + id + "', '" + username + "', '" + fecha + "')";
		String sql2 = "DELETE FROM carrito WHERE id =" + id + " AND username = '" + username + "'";
		
		try {
			Statement st = con.getConnection().createStatement();
			st.executeQuery(sql);
			st.executeQuery(sql2);

			return "true";
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		} finally {
			con.desconectar();
		}
		
		return "false";
	}

	@Override
	public String listarAleatorio(boolean ordenar, String orden) {
		
		Gson gson = new Gson();
		DBConnection con = new DBConnection();
		
		String sql = "SELECT * FROM juegos ORDER BY RAND() LIMIT 6;";
		
		if(ordenar == true) {
			sql += " ORDER BY genero " + orden;
		}
		
		List<String> juegos = new ArrayList<String>();
		
		try {
			Statement st = con.getConnection().createStatement();
			ResultSet rs = st.executeQuery(sql);
			
			while(rs.next()) {
				int id = rs.getInt("id");
				String titulo = rs.getString("titulo");
				String genero1 = rs.getString("genero1");
				String genero2 = rs.getString("genero2");
				String empresa = rs.getString("empresa");
				String descripcion = rs.getString("descripcion");
				int fechaLanzamiento = rs.getInt("fechaLanzamiento");
				double precio = rs.getDouble("precio");
				String imagen = rs.getString("imagen");
				String trailer = rs.getString("trailer");
				
				Juego juego = new Juego (id, titulo, genero1, genero2, empresa, descripcion, fechaLanzamiento, precio, imagen, trailer);
				
				juegos.add(gson.toJson(juego));
			}
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		} finally {
			con.desconectar();
		}

		return gson.toJson(juegos);
	}

	@Override
	public String listarCat(String genero) {
		
	    Gson gson = new Gson();
	    DBConnection con = new DBConnection();
	    
	    String sql = "SELECT * FROM juegos WHERE genero1 = '" + genero + "' OR genero2 = '" + genero + "' ORDER BY genero1 ";
	    
	    List<String> juegos = new ArrayList<>();

	    try {
	    	Statement st = con.getConnection().createStatement();
			ResultSet rs = st.executeQuery(sql);

	        while (rs.next()) {
	            int id = rs.getInt("id");
	            String titulo = rs.getString("titulo");
	            String genero1 = rs.getString("genero1");
	            String genero2 = rs.getString("genero2");
	            String empresa = rs.getString("empresa");
	            String descripcion = rs.getString("descripcion");
	            int fechaLanzamiento = rs.getInt("fechaLanzamiento");
	            double precio = rs.getDouble("precio");
	            String imagen = rs.getString("imagen");
	            String trailer = rs.getString("trailer");

	            Juego juego = new Juego(id, titulo, genero1, genero2, empresa, descripcion, fechaLanzamiento, precio, imagen, trailer);

	            juegos.add(gson.toJson(juego));
	        }
	    } catch (Exception ex) {
	        System.out.println(ex.getMessage());
	    } finally {
	        con.desconectar();
	    }

	    return gson.toJson(juegos);
	}

	@Override
	public String listarBusqueda(String busqueda) {
		
		Gson gson = new Gson();
	    DBConnection con = new DBConnection();
	    
	    String sql = "SELECT * FROM juegos WHERE titulo LIKE '" + busqueda + "%' OR titulo LIKE '%" + busqueda + "%' "
	    		+ "ORDER BY CASE WHEN titulo LIKE '" + busqueda + "%' THEN 0 ELSE 1 END, titulo";
	    
	    List<String> juegos = new ArrayList<>();

	    try {
	    	Statement st = con.getConnection().createStatement();
			ResultSet rs = st.executeQuery(sql);

	        while (rs.next()) {
	            int id = rs.getInt("id");
	            String titulo = rs.getString("titulo");
	            String genero1 = rs.getString("genero1");
	            String genero2 = rs.getString("genero2");
	            String empresa = rs.getString("empresa");
	            String descripcion = rs.getString("descripcion");
	            int fechaLanzamiento = rs.getInt("fechaLanzamiento");
	            double precio = rs.getDouble("precio");
	            String imagen = rs.getString("imagen");
	            String trailer = rs.getString("trailer");

	            Juego juego = new Juego(id, titulo, genero1, genero2, empresa, descripcion, fechaLanzamiento, precio, imagen, trailer);

	            juegos.add(gson.toJson(juego));
	        }
	    } catch (Exception ex) {
	        System.out.println(ex.getMessage());
	    } finally {
	        con.desconectar();
	    }

	    return gson.toJson(juegos);
	}

}
