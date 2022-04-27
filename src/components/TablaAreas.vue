<template>
	
	<div class="table-responsive">
		
		<p v-if="areas.length == 0" class="text-muted text-center">No hay áreas creadas.</p>

		<table v-else class="table">

			<thead>

				<th>ID</th>
				<th>Cód. Área</th>
				<th>Área</th>

			</thead>

			<tbody>

				<tr v-for="area in areas" :key="area.idArea">

					<td>{{ area.idArea }}</td>
					<td>{{ area.codArea }}</td>
					<td>{{ area.Area }}</td>

				</tr>

			</tbody>

		</table>

	</div>

</template>

<script>
import axios from 'axios';

export default {
	
	name: 'TablaAreas',

	data(){

		return({
			areas: [],
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

	td, th{

		font-size: 0.8em;

	}

</style>