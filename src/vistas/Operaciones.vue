<template>
	
	<div>

		<img style="width:30%; display:block; margin:0 auto;" src="../assets/operation.svg" alt="">

		<h3>Operaciones</h3>
		<p>Las últimas 50 operaciones registradas en la base de datos.</p>

		<div class="row mb-4">

			<div class="col-12 col-md-5">

				<input v-model="textoBuscar" @input="buscarOperacion" placeholder="Operación a buscar" type="text" class="form-control">

			</div>

		</div>

		<div v-if="textoBuscar.length > 0">
			
			<ListaOperaciones :operaciones="operacionesFiltradas"/>
		
		</div>
		<div v-else>

			<ListaOperaciones :operaciones="operaciones"/>

		</div>

	</div>

</template>

<script>
import axios from 'axios';
import ListaOperaciones from '../components/ListaOperaciones.vue';

export default {
       components: { ListaOperaciones },
	
	name: 'Operaciones',

	data(){

		return({

			operaciones: [],
			operacionesFiltradas: [],
			textoBuscar: "",

		})

	},

	methods: {

		cargarOperaciones: function(e){

			axios.get( "http://"+ process.env.VUE_APP_API +":3000/operaciones" ).then( res => {

				this.operaciones = res.data

			} ).catch( err => {

				console.log( "[ERROR] No se han podido obtener las operaciones. Error detallado: " + err );

			} )

		},

		buscarOperacion: function(){

			this.operacionesFiltradas = this.operaciones.filter( el => {

				return (el.codOperacion).includes( this.textoBuscar )

			} );

		}

	},

	mounted(){

		this.cargarOperaciones()

	}

}
</script>