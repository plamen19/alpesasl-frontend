<template>
	
	<div>

		<h3>Áreas</h3>
		<p>Áreas creadas en el sistema.</p>

		<div class="table-responsive">

			<table class="table">

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

	</div>

</template>

<script>
import axios from 'axios';

export default {
	
	name: 'Areas',

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

	th, td{

		font-size: 0.8em;

	}

</style>