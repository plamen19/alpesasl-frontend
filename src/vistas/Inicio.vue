<template>
       <div>

		<img style="width:30%; display:block; margin:0 auto;" src="../assets/inicio.svg" alt="">

		<br><br>

		<h3>Principal</h3>
		<p>Sistema de gestión y maquinaria.</p>

		<br>
		
		<h3>Operaciones</h3>
		<p>Últimas operaciones registradas en el sistema.</p>

		<UltOperaciones :data="ultOperaciones"/>

       </div>
</template>

<script>
import axios from 'axios';
import UltBoletin from '../components/UltBoletin.vue';
import UltOperaciones from '../components/UltOperaciones.vue';

export default {
       components: { UltBoletin, UltOperaciones },

       name: "Inicio",

	data(){

		return({

			ultOperaciones: [],
			ultBoletinIniciado: [],

		})

	},

	methods: {

		cargarOperaciones: function(e){

			axios.get( "http://"+ process.env.VUE_APP_API +":3000/operaciones" ).then( res => {

				this.ultOperaciones = res.data;

			} ).catch( err =>{

				console.log("[ERROR] No se han podido cargar las operaciones. Error detallado: " + err);

			} )

		},

		cargarUltimosBoletines: function(e){

			axios.get( "http://" + process.env.VUE_APP_API + ":3000/boletines/ultimoIniciado" ).then( res => {

				this.ultBoletinIniciado = res.data;

			} ).catch( err => {

				console.log( "[ERROR] No se ha podido cargar el último boletín iniciado. Error detallado: " + err );

			} );

		}

	},

	mounted(){

		this.cargarOperaciones();
		this.cargarUltimosBoletines();

	}

};
</script>

<style scoped>

	.card{

		margin-bottom:30px;

	}

	.col h5{

		font-size: 0.85em;

	}

	.card-header{

		background-color: rgba(100,150,100,0.2);

	}

	li{

		list-style:none;
		font-size: 0.7em;

		padding:5px;

	}

</style>