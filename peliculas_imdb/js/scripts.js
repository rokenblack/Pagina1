$(document).ready(function() {
    let endpoint = 'https://api.themoviedb.org/3/movie/now_playing'
    let apiKey = '3e4d90cc981994d2cf858de33c365791'
    let poster_path = 'https://image.tmdb.org/t/p/w500' // + poster_path
    let background_path = 'https://image.tmdb.org/t/p/w500' // + backdrop_path
    var referencia_actual = ""

    $(document).on("click", ".boton_info" , function() {
        $( "#listado_peliculas" ).hide()
        referencia_actual = "#"+$(this).attr("referencia_oculta")
        $( referencia_actual ).show()
        $('.img_Cambio').show()
        // 1. Crear un boton que nos permita volver atras:
        //info_peliculas.append boton o
        var boton = '<button type="button" class="btn btn-outline-primary boton_atras">Atrás</button>'
        $("#info_peliculas").append( boton )
        });


    $(document).on("click", ".boton_atras" , function() {
        $( "#listado_peliculas" ).show()
        $(this).remove()
        $( referencia_actual ).hide()
    })


    $(document).on("mouseover", ".img_Cambio" , function() {
      $(this).css('filter', 'contrast(100%)')
      $(this).css('height', '300px')
      })

    $(document).on("mouseleave", ".img_Cambio" , function() {
      $(this).css('filter', 'sepia(300%)')
      $(this).css('height', '300px')
      $(this).css('border-radiu', '30px')
      })


    $.ajax({
        url: endpoint + "?api_key=" + apiKey + '&language=es-ES',
        contentType: "application/json",
        dataType: 'json',
        success: function(result){

           var lista_peliculas = result.results

           for(var item=0; item<lista_peliculas.length; item++){
                var pelicula_actual = lista_peliculas[item]

                // https://getbootstrap.com/docs/4.5/components/card/
                $( "#listado_peliculas" ).append(
                    '<div class="col-12 col-sm-6 col-md-4 col-xl-3">' +
                        '<div class="card mt-3">' +
                          '<img src="' + poster_path + pelicula_actual.poster_path + '" class="card-img-top img_card img_Cambio" alt="..." >' +
                          '<div class="card-body">' +
                            '<h5 class="card-title">' + pelicula_actual.title +'</h5>' +
                            '<p class="card-text pelicula_card_overview">' + pelicula_actual.overview +'</p>' +
                            '<a href="#" class="btn btn-primary boton_info" referencia_oculta="peli'+item+'">Información</a>' +
                          '</div>' +
                        '</div>' +
                    '</div>');

                    $( "#info_peliculas" ).append("<div style='display:none' id='peli"+item+"'><h1>"+pelicula_actual.title+"</h1><p>"+pelicula_actual.overview+"</p></div>");

           }

        }
    })

});
