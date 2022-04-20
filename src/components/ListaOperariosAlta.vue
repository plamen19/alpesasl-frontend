<template>
	
	<div>

		<OpcionesEquipo/>

		<div class="row">

			<div class="col-12 col-md-9 mt-2 mb-3 mb-md-0">

				<table v-if="infoTurno">

					<tbody class="text-muted">

						<td>{{ (new Date(infoTurno.FechaTurno).toLocaleDateString('es-ES')) }}</td>
						<td>{{ infoTurno.Turno }}</td>
						<td>{{ getHoraFormateada( infoTurno.InicioTurno ) }}</td>
						<td>{{ getHoraFormateada( infoTurno.FinalTurno ) }}</td>

					</tbody>

				</table>

				<table>

					<thead>

						<th>Marcaje</th>
						<th>Cod.</th>
						<th>Operario</th>
						<th>Puesto</th>

					</thead>

					<tbody v-if="listaOperarios && listaOperarios.length > 0">

						<tr v-for="(operario, indice) in listaOperarios" :key="indice">
							
							<td>{{ getHoraFormateada( operario.Marcaje ) }}</td>
							<td>{{ operario.codOperario }}</td>
							<td>{{ operario.Operario }}</td>
							<td>{{ operario.Puesto == 1 ? 'Jefe de Máquina' : 'Operario' }}</td>

						</tr>

					</tbody>

				</table>

			</div>
			<div class="col-12 col-md-3">

				<el-button size="large" type="primary" class="p-3 w-100" plain>Descanso</el-button>
				<br><br>
				<el-button size="large" type="primary" class="p-3 w-100" plain>Limpieza</el-button>
				<br><br>
				<el-button size="large" type="danger" class="p-3 w-100" plain>Paro</el-button>
				<br><br>
				<el-button size="large" type="warning" class="p-3 w-100" plain>Preparacion</el-button>
		
			</div>

		</div>

	</div>

</template>

<script>
import OpcionesEquipo from './OpcionesEquipo.vue';
import axios from 'axios';

export default {
	
	name: 'ListaOperariosAlta',

	props: ['listaOperarios', 'idMaquina'],
	
	components: {

		OpcionesEquipo,

	},

	data(){

		return({

			infoTurno: null,

		})

	},

	methods: {

		getHoraFormateada: function(hora){

			return (new Date(hora).toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'}));

		},

		cargarEquipoProduccion: function(){

			console.log( "Cargando equipo de produccion." );

			axios.get( "http://" + process.env.VUE_APP_API + ":3000/maquina/" + this.idMaquina + "/equipoprod" ).then( res => {

				this.infoTurno = res.data[0];

			} ).catch( err => {

				console.log( "[ERROR] Error al cargar el equipo de producción. Error detallado: " + err );

			} )

		}

	},

	mounted(){

		this.cargarEquipoProduccion();

	}


}
</script>

<style scoped>

	th, td{
		padding:10px;
	}

	.vs-button-line{
		padding:10px;
		margin-bottom: 10px;
	}

</style>