package Modelos;

public class Juego {
	private int id;
	private String titulo;
	private String genero1;
	private String genero2;
	private String empresa;
	private String descripcion;
	private int fechaLanzamiento;
	private double precio;
	private String imagen;
	private String trailer;
	
	public Juego(int id, String titulo, String genero1, String genero2, String empresa, String descripcion,
			int fechaLanzamiento, double precio, String imagen, String trailer) {
		super();
		this.id = id;
		this.titulo = titulo;
		this.genero1 = genero1;
		this.genero2 = genero2;
		this.empresa = empresa;
		this.descripcion = descripcion;
		this.fechaLanzamiento = fechaLanzamiento;
		this.precio = precio;
		this.imagen = imagen;
		this.trailer = trailer;
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

	public String getGenero1() {
		return genero1;
	}

	public void setGenero1(String genero1) {
		this.genero1 = genero1;
	}

	public String getGenero2() {
		return genero2;
	}

	public void setGenero2(String genero2) {
		this.genero2 = genero2;
	}

	public String getEmpresa() {
		return empresa;
	}

	public void setEmpresa(String empresa) {
		this.empresa = empresa;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public int getFechaLanzamiento() {
		return fechaLanzamiento;
	}

	public void setFechaLanzamiento(int fechaLanzamiento) {
		this.fechaLanzamiento = fechaLanzamiento;
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
	
	public String getTrailer() {
		return trailer;
	}

	public void setTrailer(String trailer) {
		this.trailer = trailer;
	}

	@Override
	public String toString() {
		return "Juego [id=" + id + ", titulo=" + titulo + ", genero1=" + genero1 + ", genero2=" + genero2 + ", empresa="
				+ empresa + ", descripcion=" + descripcion + ", fechaLanzamiento=" + fechaLanzamiento + ", precio="
				+ precio + ", imagen=" + imagen + ", trailer=" + trailer + "]";
	}
}
