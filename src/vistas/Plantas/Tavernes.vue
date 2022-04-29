<template>
	
	<div>

		<h3>Tavernes</h3>

		<div v-if="cargando">

			<p class="text-muted text-center mt-4">{{ cargando == 1 ? 'Cargando máquinas...' : 'Realizando conexión con el servidor...' }}</p>
			<div class="spinner-border text-secondary d-block mx-auto" role="status"></div>

		</div>

		<div v-else>

			<div class="row">

				<div v-for="(maq, index) in maquinas" :key="index" :class="!menu ? 'col-12 col-md-3' : 'col-12 col-md-4'">

					<vs-card>
						
						<h5 class="text-center">{{ maq.Maquina }}</h5>

						<div v-if="datosMaquinas[maq.codMaquina] && datosMaquinas[maq.codMaquina].length > 0">

							<li><b>Estado:</b> <span :class="tagEstados[getTextoFormateadoSPIN(datosMaquinas[ maq.codMaquina ][2])]">{{ getTextoFormateadoSPIN(datosMaquinas[ maq.codMaquina ][2]) }}</span></li>

						</div>

					</vs-card>

				</div>

			</div>

		</div>
		
	</div>

</template>

<script>
import axios from 'axios';

export default {
	
	name: 'Tavernes',

	props: ["menu"],

	data(){

		return({

			maquinas: [],
			datosMaquinas: [],
			cargando: 1,

			tagEstados: {

				'SIN ESTADO': 'tag is-light is-secondary',
				'PREPARACION': 'tag is-light is-info',
				'MARCHA': 'tag is-light is-success',
				'TEST PARO': 'tag is-light is-secondary',
				'PARO': 'tag is-light is-danger',
				'TEST MARCHA': 'tag is-light is-secondary',
				'DESCANSO': 'tag is-light is-primary',
				'LIMPIEZA': 'tag is-light is-primary',
				"E.TUBO": 'tag is-light is-warning',

			},			

		})

	},

	methods: {

		getNumeroFormateadoSPIN: function (texto){

			return +(texto.split("=")[1]).substring(1, (texto.split("=")[1]).length-1).replace(",",".");

		},

		getTextoFormateadoSPIN: function (texto){

			return (texto.split("=")[1]).substring(1, (texto.split("=")[1]).length-1);

		},

		getTiempoFormateado: function( tiempo ){

			let horas = Math.floor((tiempo/3600));
			let minutos = Math.floor((tiempo/60)%60);
			let secs = Math.floor(tiempo%60);

			return (horas < 10 ? "0" + horas : horas) + ":" + (minutos < 10 ? "0" + minutos : minutos) + ":" + (secs < 10 ? "0" + secs : secs);

		},		

		cargarDatosSpin: function(){

			var cargadas = 0;

			this.maquinas.forEach(maq => {
				
				axios.get( "http://" + process.env.VUE_APP_API + ":3000/spincliente/" + maq.codMaquina + "/datos", { timeout: 2000 } ).then( res => {

					let datosXML = (res.data).datos.replace(/(\r\n|\n|\r|\t|\u0002|\u0003)/gm,"");

					if( datosXML ){

						this.datosMaquinas[ maq.codMaquina ] = datosXML.split(" ");

						cargadas++;

						if( cargadas == this.maquinas.length ){ this.cargando = false; }

					}				

				} ).catch( err => {

					console.log( "[ERROR] No se puede cargar la información de SPIN. Error detallado: " + err );

				} );

			});

		},

		cargarMaquinas: function(){

			axios.get( "http://" + process.env.VUE_APP_API + ":3000/maquinas" ).then( res => {

				this.maquinas = res.data;
				this.cargando = 2;

				this.cargarDatosSpin();

			} ).catch( err => {

				console.log( "[ERROR] No se han podido cargar las máquinas. Error detallado: " + err );

			} )

		}

	},

	mounted(){

		this.cargarMaquinas()

	}

}
</script>

<style scoped>

	li{

		list-style: none;

	}

</style>