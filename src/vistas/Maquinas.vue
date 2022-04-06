<template>
	
	<div>

		<img style="width:30%; display:block; margin:0 auto;" src="../assets/factory.svg" alt="">

		<br><br>

		<h3>Máquinas</h3>
		<p>Listado de todas las máquinas en el sistema. <span style="float:right; font-size:0.75em;" class="text-muted d-none d-md-inline-block d-xl-inline-block">Registradas {{ maquinas.length }}</span></p>

		<ListaMaquinas :data="maquinas" :tiposMaquinas="tiposMaquinas"/>

	</div>

</template>

<script>
import axios from 'axios';
import ListaMaquinas from '../components/ListaMaquinas.vue';

export default {
       components: { ListaMaquinas },

	name: 'Maquinas',

	data(){

		return{

			maquinas: [],
			tiposMaquinas: [],

		}

	},

	methods: {

		cargarMaquinas: function(e){

			axios.get( "http://192.168.1.10:3000/maquinas" ).then( res => {

				this.maquinas = ( res.data.sort( (a,b)=>{ return a.PLC < b.PLC } ) )

			} ).catch( err => {

				console.log("[ERROR] No se han podido cargar las máquinas. Error detallado: " + err);

			} )

		},

		cargarTiposMaquina: function(e){

			axios.get( "http://192.168.1.10:3000/maquinas/tipos" ).then( res => {

				res.data.forEach(tipo => {
					
					this.tiposMaquinas[ tipo.idTipoMaquina ] = { cod: tipo.codTipoMaquina, nombre: tipo.TipoMaquina }

				});

			} ).catch( err => {

				console.log("[ERROR] No se han podido cargar las máquinas. Error detallado: " + err);

			} )

		},

	},

	mounted(){

		this.cargarTiposMaquina();
		this.cargarMaquinas();

	}

}
</script>