package Modelos;

import java.util.Date;

public class Carrito {
	private int id;
	private String titulo;
	private Date fecha;
	private double precio;
	
	public Carrito(int id, String titulo, Date fecha, double precio) {
		super();
		this.id = id;
		this.titulo = titulo;
		this.fecha = fecha;
		this.precio = precio;
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

	@Override
	public String toString() {
		return "Carrito [id=" + id + ", titulo=" + titulo + ", fecha=" + fecha + ", precio=" + precio + "]";
	}
}
