<template>
	
	<div>


	</div>

</template>

<script>
import axios from 'axios';

export default {
	
	name: 'Operaciones',

	data(){

	},

	methods: {

		cargarOperaciones: function(e){

			axios.get( "http://localhost:3000/operaciones" ).then( res => {

				console.log(res.data);

			} ).catch( err => {

				console.log( "[ERROR] No se han podido obtener las operaciones. Error detallado: " + err );

			} )

		}

	},

	mounted(){

		this.cargarOperaciones()

	}

}
</script>