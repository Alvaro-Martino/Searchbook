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

							let tituloformulario = titulo;
							let autorformulario = autor;
							let editorformualrio = editor;

							CrearItem(tituloformulario);
							CrearItem(autorformulario);
							CrearItem(editorformualrio);
							GuardarDB();

					} else if(autor != '' && titulo == '') {
							//editor tiene contenido y solo autor tiene contenido
							continuacion = "+inauthor:" + autor + "+inpublisher:" + editor;
							let autorformulario = autor;
							let editorformualrio = editor;
							CrearItem(autorformulario);
							CrearItem(editorformualrio);
							GuardarDB();

					} else{ if (autor == '' && titulo != ''){
							//editor tiene contenido y solo titulo tiene contenido
							continuacion = "+intitle:" + titulo + "+inpublisher:" + editor;

							let tituloformulario = titulo;
							let autorformulario = editor;
							CrearItem(tituloformulario);
							CrearItem(editorformulario);
							GuardarDB();


					} else { // editor tiene contenido y ninguno tiene contenido
							continuacion = "+inpublisher:" + editor;
							let editorformualrio = editor;
							CrearItem(editorformulario);
							GuardarDB();
							 }

					}

} else {


					if (autor != '' && titulo != '' ) {
							// editor no tiene contenido y ambos tienen contenido
							continuacion = "+intitle:" + titulo + "+inauthor:" + autor;

							let tituloformulario = titulo;
							let autorformulario = autor;
							CrearItem(tituloformulario);
							CrearItem(autorformulario);
							GuardarDB();

					} else if(autor != '' && titulo == '') {
							// editor no tiene contenido y solo autor tiene contenido
							continuacion = "+inauthor:" + autor;
							let autorformulario = autor;
							CrearItem(autorformulario);
							GuardarDB();

					} else{ if (autor == '' && titulo != ''){
							// editor no tiene contenido y solo titulo tiene contenido
							continuacion = "+intitle:" + titulo;
							let tituloformulario = titulo;
							CrearItem(tituloformulario);
							GuardarDB();


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
		resultado.innerHTML += '<br><a href="form.html" ><button class="btn-form">Compartir</button></a>'
	}

	

}

function mostrarBotones(numpag){
	console.log(numpag);
	for(var i = 0; i < numpag; i++){

		if (i == 0){

			botones.innerHTML += '<hr><button type="button" id="imagebutton" class="btn-form btn-pag activo">' + (i+1) + '</button>'

		}else {

		botones.innerHTML += '<button type="button" id="imagebutton" class="btn-form btn-pag">' + (i+1) + '</button>'
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

function redireccionar(){
	window.location = "index.html";
}



function valida(){

	var cuerpo = document.getElementById('cuerpo').value
	var msg = '';

	if (cuerpo == ''){
		msg = 'Debe ingresar un cuerpo al mensaje'
	}else{
		msg = 'Su mensaje fue enviado con exito'
		setTimeout("redireccionar()",5000)		
	}

	alert(msg);



}







//llamo el id del formulario desde el html, ponele un id si no tenes .
	const formulario = document.querySelector('#formulario');
	let arrayHistorial = [];
//esta es la funcion para que me los vaya poniendo en el array, no la toques
	 const CrearItem = (guardar) => {
	 	let item = {
	 		guardar: guardar,
	 	}

	 	arrayHistorial.push(item);
	 	return item;
	 	}

//funcion que carga el array al local storage tampoco la toques
	 const GuardarDB = () => {
	 	localStorage.setItem('historial', JSON.stringify(arrayHistorial));
}






 function mostrarhistorial(){

            var texto = document.getElementById("titulo").value;
            var texto1 = document.getElementById("autor").value;
            var texto2 =   document.getElementById("editor").value;

            if (texto == '' && texto1 == '' && texto2 == '') {
                  
                 
            } else { 
          

            if (texto != '' && texto1 == '' && texto2 == '') {
                
                let alldatos=[];
                datos=[];
                datos.push(document.getElementById("titulo").value);
                alldatos.push(datos)
                arjson = JSON.stringify(alldatos);
                localStorage.setItem("arrayHistorialTIT",arjson);
    
             
                    mostrar();

             } 
            if (texto != '' && texto1 != '' && texto2 == '') {
              
                let alldatos1=[];
                datos1=[];

                let alldatos=[];
                datos=[];

                datos.push(document.getElementById("titulo").value);
                datos1.push(document.getElementById("autor").value);

                alldatos.push(datos);
                alldatos1.push(datos1);

                arjson = JSON.stringify(alldatos);
                arjson1 = JSON.stringify(alldatos1);

                localStorage.setItem("arrayHistorialTIT",arjson);
                localStorage.setItem("arrayHistorialAUT",arjson1);
    
             
                    mostrar();
                    mostrar1();
                 
            }

            if (texto != '' && texto1 != '' && texto2 != '') {
                let alldatos1=[];
                datos1=[];

                let alldatos=[];
                datos=[];

                let alldatos2=[];
                datos2=[];

                datos.push(document.getElementById("titulo").value);
                datos1.push(document.getElementById("autor").value);
                datos2.push(document.getElementById("editor").value);

                alldatos.push(datos);
                alldatos1.push(datos1);
                alldatos2.push(datos2);

                arjson = JSON.stringify(alldatos);
                arjson1 = JSON.stringify(alldatos1);
                arjson2 = JSON.stringify(alldatos2);

                localStorage.setItem("arrayHistorialTIT",arjson);
                localStorage.setItem("arrayHistorialAUT",arjson1);
                localStorage.setItem("arrayHistorialEDIT",arjson2);
    
             
                    mostrar();
                    mostrar1();
                    mostrar2();
           
            }   
                
            if (texto != '' && texto1 == '' && texto2 != '') {
                let alldatos=[];
                datos=[];

                let alldatos2=[];
                datos2=[];

                datos.push(document.getElementById("titulo").value);
                datos2.push(document.getElementById("editor").value);

                alldatos.push(datos);
                alldatos2.push(datos2);

                arjson = JSON.stringify(alldatos);
                arjson2 = JSON.stringify(alldatos2);

                localStorage.setItem("arrayHistorialTIT",arjson);
                localStorage.setItem("arrayHistorialEDIT",arjson2);
    
             
                mostrar();
               
                mostrar2();
       
           
            }   

            if (texto == '' && texto1 != '' && texto2 != '') {
                let alldatos1=[];
                datos1=[];


                let alldatos2=[];
                datos2=[];

        
                datos1.push(document.getElementById("autor").value);
                datos2.push(document.getElementById("editor").value);

           
                alldatos1.push(datos1);
                alldatos2.push(datos2);

            
                arjson1 = JSON.stringify(alldatos1);
                arjson2 = JSON.stringify(alldatos2);

         
                localStorage.setItem("arrayHistorialAUT",arjson1);
                localStorage.setItem("arrayHistorialEDIT",arjson2);
    
             
               
                mostrar1();
                mostrar2();
       
            
            }   

            if (texto == '' && texto1 == '' && texto2 != '') {
      
                let alldatos2=[];
                datos2=[];
        
                datos2.push(document.getElementById("editor").value);
            
                alldatos2.push(datos2);
            
                arjson2 = JSON.stringify(alldatos2);

                localStorage.setItem("arrayHistorialEDIT",arjson2);
    
             
                mostrar2();
       
            }  

            if (texto == '' && texto1 != '' && texto2 == '') {
                let alldatos1=[];
                datos1=[];

                datos1.push(document.getElementById("autor").value);
           
                alldatos1.push(datos1);
   
                arjson1 = JSON.stringify(alldatos1);
       
                localStorage.setItem("arrayHistorialAUT",arjson1);
     
              
                mostrar1();
               
       
                } 
    }

               


function mostrar(){

 campos = JSON.parse(localStorage.getItem("arrayHistorialTIT"));
var selector = document.getElementById("select");
    if (selector.length>4){
        selector.remove(selector.length-2);
    }
    for(x=0; x < campos.length; x++){    
        $("#select").prepend("<option value="+x+"> "+campos[x][0]+"</option>");
      }
 } 

 function mostrar1(){

    campos1 = JSON.parse(localStorage.getItem("arrayHistorialAUT"));
    var selector = document.getElementById("select1");
    if (selector.length>4){
        selector.remove(selector.length-2);
    }
   
         for(x=0; x < campos.length; x++){    
             $("#select1").prepend("<option value="+x+"> "+campos1[x][0]+"</option>");
           }
    } 

function mostrar2(){

    campos2 = JSON.parse(localStorage.getItem("arrayHistorialEDIT"));
    var selector = document.getElementById("select2");
    if (selector.length>4){
        selector.remove(selector.length-2);
    }
       
    for(x=0; x < campos.length; x++){    
        $("#select2").prepend("<option value="+x+"> "+campos2[x][0]+"</option>");
               }
        } 

// TERMINA HISTORIAL

}

