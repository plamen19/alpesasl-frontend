<template>
	
	<div>

		<h3>Tipos de Intervenciones</h3>
		<p>Tipos de intervenciones creadas en el sistema.</p>

		<div class="table-responsive">

			<table class="table">

				<thead>

					<th>ID</th>
					<th>Família</th>

				</thead>

				<tbody>

					<tr v-for="intervencion in tiposIntervenciones" :key="intervencion.idFamilia">

						<td>{{ intervencion.idFamilia }}</td>
						<td>{{ intervencion.Familia }}</td>

					</tr>

				</tbody>

			</table>

		</div>

	</div>

</template>

<script>
import axios from 'axios';

export default {
	
	name: 'TiposIntervenciones',

	data(){
		return({
			tiposIntervenciones: []
		})
	},

	methods: {

		cargarTiposIntervenciones: function(){
			
			axios.get( "http://" + process.env.VUE_APP_API + ":3000/intervenciones/tipos" ).then( res => {

				this.tiposIntervenciones = res.data;

			} ).catch( err => {

				console.log( "[ERROR] No se han podido cargar los tipos de intervenciones. Error detallado: " + err );

			} )

		}

	},

	mounted(){

		this.cargarTiposIntervenciones();

	}

}
</script>

<style scoped>

	th, td {

		font-size: 0.8em;

	}

</style>