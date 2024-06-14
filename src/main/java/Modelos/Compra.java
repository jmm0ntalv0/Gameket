package Modelos;

import java.sql.Date;

public class Compra {
	private int id;
	private String titulo;
	private Date fecha;
	private double precio;
	private String imagen;
	
	public Compra(int id, String titulo, Date fecha, double precio, String imagen) {
		super();
		this.id = id;
		this.titulo = titulo;
		this.fecha = fecha;
		this.precio = precio;
		this.imagen = imagen;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public double getPrecio() {
		return precio;
	}

	public void setPrecio(double precio) {
		this.precio = precio;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	@Override
	public String toString() {
		return "Compra [id=" + id + ", titulo=" + titulo + ", fecha=" + fecha + ", precio=" + precio + ", imagen="
				+ imagen + "]";
	}
	
}
