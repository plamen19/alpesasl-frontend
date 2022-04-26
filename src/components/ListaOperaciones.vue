<template>
	
	<div>

		<div class="row">

			<div v-for="operacion in operaciones" :key="operacion.idOperacion" class="col-12 col-sm-6 col-md-4">

				<vs-card>

					<h5 class="text-center">{{ operacion.codOperacion }}</h5>

					<vs-divider></vs-divider>

					<li><b>Orden:</b> {{ operacion.codOrden }}</li>
					<li><b>Familia:</b> {{ operacion.codFamilia }}</li>
					<li><b>Estado:</b> <span :class="operacion.EstadoOperacion == 1 ? 'tag is-light is-success' : 'tag is-light is-info'">{{ operacion.EstadoOperacion == 1 || operacion.EstadoOperacion == 0 ? 'En proceso' : 'Cerrada' }}</span></li>
					<li><b>Descripcion:</b> {{ operacion.Descripcion }}</li>
					<li><b>Cantidad:</b> {{ operacion.CantidadOperacion }}</li>
					<li><b>Área:</b> {{ areas.filter( el => { return el.idArea == operacion.idArea } )[0].Area }}</li>

					<br>

					<el-button type="primary" plain>Ver más...</el-button>

				</vs-card>

			</div>

		</div>

	</div>

</template>

<script>
import axios from 'axios';

export default {
	
	name: 'ListaOperaciones',

	props: [ 'operaciones' ],

	data(){

		return({

			areas: []

		})

	},

	methods: {

		cargarAreas: function(){

			axios.get( "http://" + process.env.VUE_APP_API + ":3000/areas" ).then( res => {

				this.areas = res.data

			} ).catch( err => {

				console.log( "[ERROR] No se han podido cargar los datos de las áreas. Error detallado: " + err );

			} )

		}

	},

	mounted(){

		this.cargarAreas();

	}

}
</script>

<style scoped>

	li{

		list-style: none;
		padding:5px;

	}

</style>