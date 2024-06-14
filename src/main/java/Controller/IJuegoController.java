package Controller;

public interface IJuegoController {

	public String listar(boolean ordenar, String orden);
	
	public String listarAleatorio(boolean ordenar, String orden);
	
	public String detalles(int id);
	
	public String alquilar(int id, String username);
	
	public String comprar(int id, String username);
	
	public String listarCat(String genero);
	
	public String listarBusqueda(String busqueda);
	
}
