<template>
	
	<div>

		<h3>Boletines</h3>
		<p>Información detallada de los boletines.</p>
		
		<table class="table">

			<thead>

				<th>ID</th>
				<th>Operacion</th>
				<th>Maquina</th>
				<th>Direccion</th>

			</thead>

			<tbody>

				<tr v-for="(boletin) in boletines" :key="boletin.idBoletin">

					<td>{{ boletin.idBoletin }}</td>
					<td>{{ boletin.idOperacion }}</td>
					<td>{{ boletin.idMaquina }}</td>
					<td>{{ boletin.DireccionCliente }}</td>

				</tr>

			</tbody>

		</table>

	</div>

</template>

<script>
import axios from 'axios';

export default {
	
	name: 'Boletines',

	data(){

		return({

			boletines: []

		})

	},

	methods: {

		cargarBoletines: function(e){

			axios.get( "http://192.168.1.10:3000/boletines" ).then( res => {

				this.boletines = res.data;

			} ).catch( err => {

				console.log( "[ERROR] No se han podido obtener los boletines. Error detallado: " + err );

			} )

		}

	},

	mounted(){

		this.cargarBoletines();

	}

}
</script>