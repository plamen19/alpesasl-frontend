<template>
	
	<div>

		<img style="width:30%; display:block; margin:0 auto;" src="../assets/operation.svg" alt="">

		<h3>Operaciones</h3>
		<p>Las últimas 10 operaciones registradas en la base de datos.</p>

		<ListaOperaciones :operaciones="operaciones"/>

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

			operaciones: []

		})

	},

	methods: {

		cargarOperaciones: function(e){

			axios.get( "http://"+ process.env.VUE_APP_API +":3000/operaciones" ).then( res => {

				this.operaciones = res.data

			} ).catch( err => {

				console.log( "[ERROR] No se han podido obtener las operaciones. Error detallado: " + err );

			} )

		}

	},

	mounted(){

		this.cargarOperaciones()

	}

}
</script>