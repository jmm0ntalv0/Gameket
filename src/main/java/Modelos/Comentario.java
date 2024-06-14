package Modelos;

import java.sql.Date;

public class Comentario {
	private int id;
	private String username;
	private String texto;
	private Date fecha;
	private boolean recomendacion;
	
	public Comentario(int id, String username, String texto, Date fecha, boolean recomendacion) {
		super();
		this.id = id;
		this.username = username;
		this.texto = texto;
		this.fecha = fecha;
		this.recomendacion = recomendacion;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public boolean isRecomendacion() {
		return recomendacion;
	}

	public void setRecomendacion(boolean recomendacion) {
		this.recomendacion = recomendacion;
	}

	@Override
	public String toString() {
		return "Comentario [id=" + id + ", username=" + username + ", texto=" + texto + ", fecha=" + fecha
				+ ", recomendacion=" + recomendacion + "]";
	}
}
