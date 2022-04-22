<template>
	
	<div>

		<h3>Grupos de Operarios</h3>
		<p>Grupos de operarios creados en el sistema.</p>

		<div class="table-responsive">

			<table class="table">

				<thead>

					<th>ID</th>
					<th>Cód. Grupo</th>
					<th>Grupo</th>

				</thead>

				<tbody>

					<tr v-for="grupo in gruposOperarios" :key="grupo.idGrupoOperarios">

						<td>{{ grupo.idGrupoOperarios }}</td>
						<td>{{ grupo.codGrupoOperarios }}</td>
						<td>{{ grupo.GrupoOperarios }}</td>

					</tr>

				</tbody>

			</table>

		</div>

	</div>
	
</template>

<script>
import axios from 'axios';

export default {
	
	name: 'GruposOperarios',

	data(){
		return({
			gruposOperarios: [],
		})
	},

	methods: {

		cargarGruposOperarios: function(){

			axios.get( "http://" + process.env.VUE_APP_API + ":3000/operarios/grupos" ).then( res => {

				this.gruposOperarios = res.data;

			} ).catch( err => {

				console.log( "[ERROR] No se han podido cargar los grupos de operarios. Error detallado: " + err );

			} )

		}

	},

	mounted(){
		
		this.cargarGruposOperarios();

	}

}
</script>
<style scoped>

	th, td{

		font-size: 0.8em;

	}

</style>