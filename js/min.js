function bookSearch() {
	var autor = '';
	var titulo = '';
	var editor = '';
	autor = document.getElementById('autor').value
	titulo = document.getElementById('titulo').value
	editor = document.getElementById('editor').value
	var continuacion = '';

if (editor != ''){
					if (autor != '' && titulo != '' ) {
							//editor tiene contenido y ambos tienen contenido
							continuacion = "+intitle:" + titulo + "+inauthor:" + autor +  "+inpublisher:" + editor;

					} else if(autor != '' && titulo == '') {
							//editor tiene contenido y solo autor tiene contenido
							continuacion = "+inauthor:" + autor + "+inpublisher:" + editor;

					} else{ if (autor == '' && titulo != ''){
							//editor tiene contenido y solo titulo tiene contenido
							continuacion = "+intitle:" + titulo + "+inpublisher:" + editor;


					} else { // editor tiene contenido y ninguno tiene contenido
							continuacion = "+inpublisher:" + editor;
							 }

					}

} else {


					if (autor != '' && titulo != '' ) {
							// editor no tiene contenido y ambos tienen contenido
							continuacion = "+intitle:" + titulo + "+inauthor:" + autor;

					} else if(autor != '' && titulo == '') {
							// editor no tiene contenido y solo autor tiene contenido
							continuacion = "+inauthor:" + autor;

					} else{ if (autor == '' && titulo != ''){
							// editor no tiene contenido y solo titulo tiene contenido
							continuacion = "+intitle:" + titulo;


					} else { //ninguno tiene contenido 
							var msg = 'Debes rellenar alguno de los campos';
							alert(msg)
							 }

					}
}





	
	$.ajax({
		url:"https://www.googleapis.com/books/v1/volumes?q=" + titulo  + continuacion  +"&maxResults=40",
		dataType: 'json',

		success: function(data){


			var totales = data.items.length;
			var xpag = 10;
			var npag = totales / xpag;
			var numpag = Math.ceil(npag);
			eliminarBotones();
			mostrarResul(data,0,10);
			mostrarBotones(numpag);

			$(document).ready(function(){


				var botones = document.querySelectorAll('#botones button');
				for (var i = 0; i < numpag; i++){
					botones[i].addEventListener('click',function(){

						quitarActivo();
						var indice = parseInt(this.textContent);
						var d = (indice - 1) * xpag;
						var h = indice * xpag;
						mostrarResul(data,d,h);
						$(this).addClass('activo');

					});

				}




			});


		},

		type: 'GET'


	})
}



document.getElementById('boton').addEventListener('click' , bookSearch , false)

				
function mostrarResul(data,desde,hasta){

	$("#resultado").empty();
	if (data.items.length < hasta) {
		hasta = data.items.length;
		}
	console.log(data.items.length);
	for(i = desde; i < hasta; i++){

		resultado.innerHTML += '<hr><h3>' + data.items[i].volumeInfo.title + '</h3>' + '<h4> Autores :  ' + data.items[i].volumeInfo.authors + '</h4>'
		resultado.innerHTML += '<h5>' + data.items[i].volumeInfo.publisher + '</h5>'
		resultado.innerHTML += '<img class="img-lib" src= "' + data.items[i].volumeInfo.imageLinks.thumbnail + '"alt="imagen del libro">'
		resultado.innerHTML += '<br><a href=' + data.items[i].volumeInfo.infoLink + '><button id="imagebutton" class="btn-form">Leer mas</button></a>'

	}

	

}

function mostrarBotones(numpag){
	console.log(numpag);
	for(var i = 0; i < numpag; i++){

		if (i == 0){

			botones.innerHTML += '<button type="button" class="btn-form btn-pag activo">' + (i+1) + '</button>'

		}else {

		botones.innerHTML += '<button type="button" class="btn-form btn-pag">' + (i+1) + '</button>'
	}
	}


}

function eliminarBotones(){

	$('#botones').empty();
}


function quitarActivo(){

	var botones = document.querySelectorAll('#botones button');
	for(var i = 0; i < botones.length; i++){
		$(botones[i]).removeClass('activo');
	}
}
