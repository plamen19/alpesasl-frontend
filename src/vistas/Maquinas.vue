<template>
	
	<div>

		<h3>Máquinas</h3>
		<p>Listado de todas las máquinas en el sistema. <span style="float:right; font-size:0.75em;" class="text-muted d-none d-md-inline-block d-xl-inline-block">Registradas {{ maquinas.length }}</span></p>

		<div class="row mb-4">

			<el-select @change="cambiarFiltroMaquina" v-model="selectFiltro" placeholder="Tipo de maquina" v-if="tiposMaquinas && tiposMaquinas.length > 0">

					<el-option
						key="0"
						label="Todas"
						value="0"
					/>
					<el-option
						v-for="tipo in tiposMaquinas"
						:key="tipo.id"
						:label="tipo.nombre"
						:value="tipo.id"
					/>

			</el-select>

		</div>

		<ListaMaquinas :menu="menu" ref="ListaMaquinas" :data="maquinas" :tiposMaquinas="tiposMaquinas"/>

	</div>

</template>

<script>
import axios from 'axios';
import ListaMaquinas from '../components/ListaMaquinas.vue';

export default {
       components: { ListaMaquinas },

	props: ['menu'],

	name: 'Maquinas',

	data(){

		return{

			maquinas: [],
			maquinasFiltradas: [],
			tiposMaquinas: [],
			selectFiltro: '',

		}

	},

	methods: {

		cargarMaquinas: function(e){

			axios.get( "http://"+ process.env.VUE_APP_API +":3000/maquinas" ).then( res => {

				this.maquinas = ( res.data.sort( (a,b)=>{ return a.PLC < b.PLC } ) )

			} ).catch( err => {

				console.log("[ERROR] No se han podido cargar las máquinas. Error detallado: " + err);

			} )

		},

		cargarTiposMaquina: function(e){

			axios.get( "http://"+ process.env.VUE_APP_API +":3000/maquinas/tipos" ).then( res => {

				res.data.forEach(tipo => {
					
					this.tiposMaquinas.push( { id: tipo.idTipoMaquina, cod: tipo.codTipoMaquina, nombre: tipo.TipoMaquina } );

				});

			} ).catch( err => {

				console.log("[ERROR] No se han podido cargar las máquinas. Error detallado: " + err);

			} )

		},

		cambiarFiltroMaquina: function(){

			if( this.selectFiltro == 0 ){

				this.$refs.ListaMaquinas.filtrarMaquinas( this.maquinas );
			}else{


				this.$refs.ListaMaquinas.filtrarMaquinas( this.maquinas.filter( el => {
					
					return el.idTipoMaquina === this.selectFiltro;

				} ) )
			}

		}

	},

	mounted(){

		this.cargarTiposMaquina();
		this.cargarMaquinas();

	}

}
</script>

<style scoped>

	h4{

		font-weight:100;

	}

</style>