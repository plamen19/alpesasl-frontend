<template>
	
	<div>

		<h3>Boletines</h3>
		<p>Información detallada de los boletines.</p>

		<el-alert v-if="boletinesFiltrados.length == 0 && boletinBuscar.length > 0" class="mb-2" title="No se han encontrado resultados." type="error" />

		<div class="row">

			<div class="col-12 col-md-4">

				<input v-model="boletinBuscar" @input="buscarBoletin" placeholder="ID de Boletín u Operación" type="text" class="form-control">

			</div>

		</div>

		<div class="table-responsive">

			<table class="table">

				<thead>

					<th>ID</th>
					<th>Operacion</th>
					<th>Maquina</th>
					<th>Direccion</th>

				</thead>

				<tbody>

					<template v-if="boletinesFiltrados && boletinesFiltrados.length > 0">

						<tr v-for="(boletin) in boletinesFiltrados" :key="boletin.idBoletin">

							<td>{{ boletin.idBoletin }}</td>
							<td>{{ boletin.idOperacion }}</td>
							<td>{{ boletin.idMaquina }}</td>
							<td>{{ boletin.DireccionCliente }}</td>

						</tr>

					</template>
					<template v-else>

						<tr v-for="(boletin) in boletines" :key="boletin.idBoletin">

							<td>{{ boletin.idBoletin }}</td>
							<td>{{ boletin.idOperacion }}</td>
							<td>{{ boletin.idMaquina }}</td>
							<td>{{ boletin.DireccionCliente }}</td>

						</tr>

					</template>

				</tbody>

			</table>

		</div>

	</div>

</template>

<script>
import axios from 'axios';

export default {
	
	name: 'Boletines',

	data(){

		return({

			boletines: [],
			boletinesFiltrados: [],

			boletinBuscar: "",

		})

	},

	methods: {

		cargarBoletines: function(e){

			axios.get( "http://"+ process.env.VUE_APP_API +":3000/boletines" ).then( res => {

				this.boletines = res.data;

			} ).catch( err => {

				console.log( "[ERROR] No se han podido obtener los boletines. Error detallado: " + err );

			} )

		},

		buscarBoletin: function(e){
			
			this.boletinesFiltrados = this.boletines.filter( el => {

				return ((el.idBoletin + "").includes(this.boletinBuscar)) || ( (el.idOperacion + "").includes(this.boletinBuscar) );

			} )

		}

	},

	mounted(){

		this.cargarBoletines();

	}

}
</script>