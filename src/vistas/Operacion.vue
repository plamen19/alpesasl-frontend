<template>
	
	<div>

		<div v-if="error">

			<p class="text-muted text-center">La operación no existe.</p>

		</div>

		<div v-else>

			<h3>{{ datos.codOperacion }}</h3>
			<p>Información detallada sobre la operación {{ id }} - {{ datos.codOperacion }}</p>
			

		</div>

	</div>
	
</template>

<script>
import axios from 'axios';

export default {
	
	nmae: 'Operacion',

	data(){

		return({

			id: this.$route.params.id || null,
			datos: [],
			error: false,

		})

	},

	methods: {

		cargarDatosOperacion: function(){

			axios.get( "http://" + process.env.VUE_APP_API + ":3000/operacion/" + this.id ).then( res => {

				if( res && res.data && res.data.length > 0 ){

					this.datos = res.data[0]

				}else{

					this.error = true;

				}

			} ).catch( err => {

				console.log( "[ERROR] No se han podido obtener los datos de la operación. Error detallado: " + err );

			} )

		}

	},

	mounted(){

		this.cargarDatosOperacion();

	}

}
</script>