<template>
	
	<div class="col-12 col-md-8 mx-auto">

		<h3>Logs de {{ de }}</h3>
		<p>Registro de logs de <b>{{ de }}.</b></p>

		<el-button v-if="!cargando" @click="cargarLogs()" class="mt-1 mb-4 float-end" type="primary" plain><i class="bi bi-arrow-clockwise"></i></el-button>

		<br><br>

		<div v-if="cargando">

			<p class="text-muted text-center">Cargando logs...</p>

			<el-progress
				:show-text="false"
				:indeterminate="true"
				:duration="1"
			/>
			
			<br>

		</div>
		<div class="ml-4 ml-sm-0" v-else>

			<div v-if="logs && logs.length > 0">
				
				<div v-for="(log, key) in logs" :key="key">

					<p style="font-size:0.8em;" class="text-muted">
						<span :class="log.level == 'info' ? 'tag is-info is-light' : 'tag is-danger is-light'"><i :class="log.level == 'info' ? 'bi bi-info' : 'bi bi-x'"></i> {{ log.level == 'info' ? 'Info' : 'Error' }}</span>

						{{ log.message }}
					</p>

				</div>

			</div>
			<div v-else>

				<p class="text-muted text-center mt-2">No hay logs registrados.</p>

			</div>

		</div>

	</div>

</template>

<script>
import axios from 'axios';

export default {
	
	name: 'Log',

	data(){

		return({

			de: this.$route.params.de || null,
			logs: [],
			cargando: false,

		})

	},

	methods: {

		cargarLogs: function(){

			this.cargando = true;

			setTimeout( ()=>{

				if( this.de ){

					axios.get( "http://" + process.env.VUE_APP_API + ":3000/logs/" + this.de ).then( res => {

						this.logs = (res.data.logs).map( log => { return JSON.parse(log) } );

						this.cargando = false;

					} ).catch( err => {

						console.log( "[ERROR] No se han podido cargar los logs de " + this.de +". Error detallado: " + err );

					} )

				}

			}, 1200 )

		}

	},

	mounted(){

		this.cargarLogs();

	}

}
</script>