$(document).ready(function() {
    var noticia = new URL(location.href).searchParams.get("noticia");
    
    if (noticia == 1) {
        $("#noticia1").removeClass('d-none');
        
    } else if (noticia == 2) {
        $("#noticia2").removeClass('d-none');
        
    } else if (noticia == 3) {
        $("#noticia3").removeClass('d-none');
    }
});
