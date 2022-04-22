<template>
	
	<div>

		<h3>Motivos de Intervenciones</h3>
		<p>Motivos de intervenciones creados en el sistema.</p>

		<div class="table-responsive">

			<table class="table">

				<thead>

					<th>Código</th>
					<th>Motivo</th>
					<th>Tipo</th>
					<th>Família</th>

				</thead>

				<tbody>

					<tr v-for="motivo in motivosIntervenciones" :key="motivo.idMotivoIntervencion">

						<td>{{ motivo.codMotivoIntervencion }}</td>
						<td>{{ motivo.MotivoIntervencion }}</td>
						<td>{{ motivo.TipoIntervencion }}</td>
						<td>{{ tipos.filter( el => { return el.idFamilia == motivo.TipoIntervencion } )[0].Familia }}</td>

					</tr>

				</tbody>

			</table>

		</div>

	</div>

</template>

<script>
import axios from 'axios';

export default {
	
	name: 'MotivosIntervenciones',

	data(){
		return({
			motivosIntervenciones: [],
			tipos: [],
		})
	},

	methods: {

		// { idMotivoIntervencion: 83, codMotivoIntervencion: "INT080", MotivoIntervencion: "Defecto ancho", … }

		cargarMotivosIntervenciones: function(){
		
			axios.get( "http://" + process.env.VUE_APP_API + ":3000/intervenciones/tipos" ).then( res => {

				this.tipos = res.data;

				console.log(this.tipos);

				axios.get( "http://" + process.env.VUE_APP_API + ":3000/intervenciones/motivos" ).then( res => {

					this.motivosIntervenciones = res.data

				} ).catch( err => {

					console.log( "[ERROR] No se han podido cargar los motivos de intervenciones. Error detallado: " + err );

				} )

			} ).catch( err => {

				console.log( "[ERROR] No se han podido cargar los tipos de intervenciones. Error detallado: " + err );

			} )
		
		}

	},

	mounted(){

		this.cargarMotivosIntervenciones();

	}

}
</script>

<style scoped>

	th, td{

		font-size: 0.8em;

	}

</style>