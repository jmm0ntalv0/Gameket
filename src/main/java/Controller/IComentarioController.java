package Controller;

public interface IComentarioController {

	public String publicarComentario(int id, String username, String texto, boolean recomendacion);
	
	public String listar(int id);
	
}
