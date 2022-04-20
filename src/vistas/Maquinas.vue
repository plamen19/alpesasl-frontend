<template>
	
	<div>

		<img style="width:40%; display:block; margin:0 auto;" src="../assets/factory.svg" alt="">

		<br><br>

		<h3>Plantas</h3>
		<p>Consulta la información de todas las máquinas de una planta.</p>

		<div class="row justify-content-center text-center">

			<div class="col-12 col-md-2">

				<vs-card>

					<h4>Tavernes</h4>
					<p class="text-muted"><b>Máquinas:</b> 20</p>

					<el-button class="w-100" type="success" plain>Abrir planta</el-button>

				</vs-card>

			</div>

			<div class="col-12 col-md-2">

				<vs-card>

					<h4>Tavernes Corte</h4>
					<p class="text-muted"><b>Máquinas:</b> 20</p>

					<el-button class="w-100" type="success" plain>Abrir planta</el-button>

				</vs-card>

			</div>

			<div class="col-12 col-md-2">

				<vs-card>

					<h4>Barcelona</h4>
					<p class="text-muted"><b>Máquinas:</b> 20</p>

					<el-button class="w-100" type="success" plain>Abrir planta</el-button>

				</vs-card>

			</div>

			<div class="col-12 col-md-2">

				<vs-card>

					<h4>Puente Genil</h4>
					<p class="text-muted"><b>Máquinas:</b> 20</p>

					<el-button class="w-100" type="success" plain>Abrir planta</el-button>

				</vs-card>

			</div>

			<div class="col-12 col-md-2">

				<vs-card>

					<h4>UPalet</h4>					
					<p class="text-muted"><b>Máquinas:</b> 20</p>
					
					<el-button class="w-100" type="success" plain>Abrir planta</el-button>

				</vs-card>

			</div>

		</div>


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

			axios.get( "http://"+ process.env.VUE_APP_API +":3000/maquinas" ).then( res => {

				this.maquinas = ( res.data.sort( (a,b)=>{ return a.PLC < b.PLC } ) )

			} ).catch( err => {

				console.log("[ERROR] No se han podido cargar las máquinas. Error detallado: " + err);

			} )

		},

		cargarTiposMaquina: function(e){

			axios.get( "http://"+ process.env.VUE_APP_API +":3000/maquinas/tipos" ).then( res => {

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

<style scoped>

	h4{

		font-weight:100;

	}

</style>