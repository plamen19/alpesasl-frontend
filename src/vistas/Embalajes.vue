<template>
	
	<div>

		<h3>Embalajes</h3>
		<p>Todos los embalajes creados en la base de datos.</p>

		<div class="table-responsive">

			<table class="table">

				<thead>

					<th>ID</th>
					<th>Cód.</th>
					<th>Embalaje</th>
					<th>SubFamilia</th>

				</thead>

				<tbody>

					<tr v-for="embalaje in embalajes" :key="embalaje.idEmbalaje">

						<td>{{ embalaje.idEmbalaje }}</td>
						<td>{{ embalaje.codEmbalaje }}</td>
						<td>{{ embalaje.Embalaje }}</td>
						<td>{{ subFamilias.filter( el => { return el.idSubFamiliaEmbalaje == embalaje.idSubFamiliaEmbalaje } )[0].SubFamiliaEmbalaje }}</td>

					</tr>

				</tbody>

			</table>

		</div>

	</div>

</template>

<script>
import axios from 'axios';

export default {
	
	name: 'Embalajes',

	data(){
		return({
			embalajes: [],
			subFamilias: [],
		})
	},

	methods: {

		cargarEmbalajes: function(){

			axios.get( "http://" + process.env.VUE_APP_API + ":3000/embalajes/subfamilias" ).then( res => {

				this.subFamilias = res.data;

				axios.get( "http://" + process.env.VUE_APP_API + ":3000/embalajes" ).then( res => {

					this.embalajes = res.data;

				} ).catch( err => {

					console.log( "[ERROR] No se han podido cargar los embalajes. Error detallado: " + err );

				} )

			} ).catch( err => {

				console.log( "[ERROR] No se han podido cargar las subfamílias de embalajes. Error detallado: " + err );

			} )

		},

	},

	mounted(){

		this.cargarEmbalajes();

	}

}
</script>

<style scoped>

	th,td{
		
		font-size: 0.8em;

	}

</style>