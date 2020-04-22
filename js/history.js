
	const formulario = document.querySelector('#formulario');
	let arrayHistorial = [];

	 const CrearItem = (guardar) => {
	 	let item = {
	 		guardar: guardar,
	 		estado: false
	 	}

	 	arrayHistorial.push(item);
	 	return item;
	 	}


	 const GuardarDB = () => {
	 	localStorage.setItem('historial', JSON.stringify(arrayHistorial));

	 }
	 function ConfirmEnvio(){
	 	alert('Mensaje enviado con éxito');
	 }

	formulario.addEventListener('submit', (e) => {
		e.preventDefault();
		let urlformulario = document.querySelector('#urlf').value;
		let nameformulario = document.querySelector('#namef').value;
		let emailformualrio = document.querySelector('#emailf').value;

		CrearItem(urlformulario);
		GuardarDB();
		formulario.reset();
		ConfirmEnvio();

	})
	console.log(arrayHistorial)

//
//////var url = document.getElementById("urlf").value;
	//var name = document.getElementById("namef").value;
	///var email = document.getElementById("emailf").value;
	///CrearItem (localStorage.setItem('url:',url));
	//CrearItem (localStorage.setItem('nombreyapellido',name));
	//CrearItem (localStorage.setItem('email:',email));