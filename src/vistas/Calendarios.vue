<template>
	
	<div>
		
		<img style="width:30%; display:block; margin:0 auto;" src="../assets/calendar.svg" alt="">

		<br><br>

		<h3>Calendarios</h3>
		<p>Información acerca de los calendarios, rotaciones y equipos.</p>

		<br>

		<div class="row">

			<div class="col-12 col-md-6">

				<h4>Turnos</h4>

				<table>

					<thead>
						<th>Cód.</th>
						<th>Turno</th>
					</thead>

					<tbody>

						<tr>
							<td>T-1</td>
							<td>T-1 Mañana</td>
						</tr>

						<tr>
							<td>T-2</td>
							<td>T-2 Tarde</td>
						</tr>

						<tr>
							<td>T-3</td>
							<td>T-3 Noche</td>
						</tr>						

					</tbody>

				</table>

			</div>

			<div class="col-12 col-md-6 mt-4 mt-md-0">

				<h4>Rotaciones</h4>

				<table>

					<thead>
						<th>Cód.</th>
						<th>Turno</th>
					</thead>

					<tbody>

						<tr>
							<td>ROTA</td>
							<td>Rotación A</td>
						</tr>

						<tr>
							<td>ROTB</td>
							<td>Rotación B</td>
						</tr>

						<tr>
							<td>ROTC</td>
							<td>Rotación C</td>
						</tr>						

					</tbody>

				</table>

			</div>		

			<div class="col mt-3">

				<h3>Calendario actual</h3>
				<p>Todos los turnos generados para el calendario actual.</p>
				
				<template v-if="calendario.length == 0">

					<p class="text-muted text-center">No hay turnos creados para este calendario.</p>

				</template>
				<template v-else>

					<div class="table-responsive">

						<table class="table">

							<thead>

								<th>Turno</th>
								<th>Rotación</th>
								<th>Fecha</th>
								<th>Inicio</th>
								<th>Fin</th>
								<th>Limpieza</th>
								<th>Descanso</th>

							</thead>
							
							<tbody>

								<tr v-for="c in calendario" :key="c.idTurnoCalendario">

									<td>{{ turnos[c.idTurno] }}</td>
									<td>{{ rotaciones[c.idRotacion] }}</td>
									<td>{{ (new Date(c.FechaTurno)).toLocaleDateString() }}</td>
									<td>{{ (new Date(c.InicioTurno)).toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'}) }}</td>
									<td>{{ (new Date(c.FinalTurno)).toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'}) }}</td>
									<td>{{ c.Limpieza }}</td>
									<td>{{ c.Descanso }}</td>

								</tr>

							</tbody>

						</table>

					</div>

				</template>
				
			</div>	

		</div>

	</div>

</template>

<script>
import axios from 'axios';

export default {
	
	name: 'Calendarios',

	data(){
		return({
			calendario: [],
			turnos: { '1': 'T1-Mañana', '2': 'T2-Tarde', '3': 'T3-Noche' },
			rotaciones: { '1': 'ROTA', '2': 'ROTB', '4': 'ROTC' },
		})
	},

	methods: {

		cargarCalendario: function(){

			axios.get( "http://" + process.env.VUE_APP_API + ":3000/calendario" ).then( res => {

				this.calendario = res.data

			} ).catch( err => {

				console.log( "[ERROR] No se han podido cargar los turnos del calendario actual. Error detallado: " + err );

			} )

		}

	},

	mounted(){

		this.cargarCalendario();

	}


}
</script>

<style scoped>

	th, td{

		padding:10px;
		font-size:0.8em;

	}

</style>