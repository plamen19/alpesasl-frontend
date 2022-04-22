<template>
	
	<div>

		<h3>Tipos de máquinas</h3>
		<p>Todos los tipos de máquinas creados en el sistema.</p>

		<div class="table-responsive">

			<table class="table">

				<thead>

					<th>ID</th>
					<th>Cód. Tipo</th>
					<th>Tipo</th>

				</thead>

				<tbody>

					<tr v-for="tipo in tiposMaquina" :key="tipo.idTipoMaquina">
						
						<td>{{ tipo.idTipoMaquina }}</td>
						<td>{{ tipo.codTipoMaquina }}</td>
						<td>{{ tipo.TipoMaquina }}</td>

					</tr>

				</tbody>

			</table>

		</div>

	</div>

</template>

<script>
import axios from 'axios';

export default {
	
	name: 'TiposMaquinas',

	data(){
		return({
			tiposMaquina: []
		})
	},

	methods: {

		cargarTiposMaquina: function(){

			axios.get( "http://" + process.env.VUE_APP_API + ":3000/maquinas/tipos" ).then( res => {

				this.tiposMaquina = res.data

			} ).catch( err => {

				console.log( "[ERROR] No se han podido obtener los tipos de máquinas. Error detallado: " + err );

			} )

		}

	},

	mounted(){

		this.cargarTiposMaquina();

	}

}
</script>
<style scoped>

	th, td{

		font-size: 0.8em;

	}

</style>