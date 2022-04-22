<template>
	
	<div>

		<h3>Actividades Intervención</h3>
		<p>Actividades de intervención creadas en el sistema.</p>

		<div class="table-responsive">

			<table class="table">

				<thead>

					<th>ID</th>
					<th>Cód.</th>
					<th>Actividad</th>
					<th>Concedido</th>

				</thead>

				<tbody>

					<tr v-for="actividad in actividadesIntervenciones" :key="actividad.idActividad">

						<td>{{ actividad.idActividad }}</td>
						<td>{{ actividad.codActividad }}</td>
						<td>{{ actividad.Actividad }}</td>
						<td>{{ actividad.ConcedidoActividad }}</td>

					</tr>

				</tbody>

			</table>

		</div>

	</div>

</template>

<script>
import axios from 'axios';

export default {
	
	name: 'ActividadesIntervenciones',

	data(){
		return({
			actividadesIntervenciones: []
		})
	},

	methods: {

		cargarActividadesIntervenciones: function(){

			axios.get( "http://" + process.env.VUE_APP_API + ":3000/intervenciones/actividades" ).then( res => {

				this.actividadesIntervenciones = res.data;

			} ).catch( err => {

				console.log( "[ERROR] No se han podido cargar las actividades. Error detallado: " + err );

			} )

		}

	},

	mounted(){

		this.cargarActividadesIntervenciones();

	}

}
</script>
<style scoped>

	th, td{

		font-size: 0.8em;

	}

</style>