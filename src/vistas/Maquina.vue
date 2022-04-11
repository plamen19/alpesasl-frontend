<template>
	
	<div>

		<div v-if="datos">

			<div class="row">

				<div class="col-12 col-md-10">

					<vs-card id="div_con_carga" class="p-3 vs-con-loading__container">
						<!-- 
							NOMBRE Y ESTADO DE LA MAQUINA
						-->
						<h3>{{ datos.Maquina }}

							<span class="estado-maquina" v-if="estadoMaquina === 'Desconocido'"><span class="tag is-light is-secondary">Cargando estado...</span></span>
							<span class="estado-maquina" v-else><span style="font-size:0.8em;" :class="badgeEstados[estadoMaquina]">{{ estadoMaquina.toLowerCase().charAt(0).toUpperCase() + estadoMaquina.toLowerCase().slice(1) }}</span></span>

						</h3>

						<h5><b class="tag is-info is-light">Cliente:</b> {{ operacion.Cliente }}</h5>
						<h5><b class="tag is-info is-light">Desc.:</b> {{ operacion.Descripcion }}</h5>

						<!-- 
							VELOCIDAD DE LA MÁQUINA
						-->
						<div v-if="velocidad === 'Calculando'">

							<BarraVelocidad :cargando="true"/>

						</div>
						<div class="mt-3" v-else>

							<BarraVelocidad :merma="merma" :velocidad="velocidad"/>

						</div>

						<!-- 
							TIEMPOS DE LA MÁQUINA (PREPARACIÓN, PARADA, MARCHA...)
						-->
						<div class="mt-2 text-left">

							<InfoTiempos :tiempos="tiempos"/>

						</div>

						<MarqueeVelocidad :velocidad="velocidad" :velocidadBoletin="boletin.VelocidadBoletin"/>

						<br>

						<!-- 
							TARJETAS CON VELOCIDAD, PULSOS, CANTIDAD PRODUCIDA, ETC
						-->
						<div class="mt-5">

							<InfoProduccion :velocidadMedia="velocidadMedia" :velocidad="velocidad" :numCortes="boletin.numCortes" :cantidadBoletin="boletin.CantidadBoletin ? boletin.CantidadBoletin : 0" :cantidadProducida="producido" :metrosEncolado="metrosEncolado" :errorPLC="errorPLC" :velocidadReal="pulsosPLC"/>

						</div>

					</vs-card>

					<br>

					<!-- <p class="text-muted">Más información de la máquina.</p>

					<div class="row">

						<div class="col-12 col-sm-6 col-md-6">

							<h3>Información básica</h3>

							<li><b>Cuchillas activas:</b> {{ datos.CuchActivas }}</li>
							<li><b>Gramaje cola:</b> {{ datos.GramajeCola }}</li>
							<li><b>Tara Merma:</b> {{ datos.TaraMerma }}</li>
							<li><b>Último boletín:</b> {{ datos.UltimoBoletin }}</li>
							<li><b>PLC Activo:</b> <span :class="datos.PLC == 1 ? 'badge bg-success' : 'badge bg-danger'">{{ datos.PLC == 1 ? 'Sí' : 'No' }}</span></li>

						</div>

						<div class="col-12 col-sm-6 col-md-6">

							<h3>Últ. Informe velocidad</h3>

							<div v-if="informeVelocidad">
								
								<li><b>Velocidad:</b> {{ informeVelocidad.Velocidad }}</li>
								<li><b>Diametro min:</b> {{ informeVelocidad.DiametroMin }}</li>
								<li><b>Diametro max:</b> {{ informeVelocidad.DiametroMax }}</li>
								<li><b>Longitud min:</b> {{ informeVelocidad.LongitudMin }}</li>
								<li><b>Longitud max:</b> {{ informeVelocidad.LongitudMax }}</li>

							</div>
							<div v-else>

								<article class="message is-danger">
									<div class="message-header">
										<p>Sin datos</p>
										<button class="delete" aria-label="delete"></button>
									</div>
									<div class="message-body">
										No se pueden cargar los datos detallados de la velocidad.
									</div>
								</article>	

							</div>

						</div>

					</div> -->

					<br>
							
				</div>

				<div class="col-12 col-md-2">

					<MenuMaquina/>					

				</div>
			</div>

		</div>

	</div>

</template>

<script>
import axios from 'axios';
import InfoProduccion from '../components/InfoProduccion.vue';
import InfoTiempos from '../components/InfoTiempos.vue';
import BarraVelocidad from '../components/BarraVelocidad.vue';
import MenuMaquina from '../components/MenuMaquina.vue';
import MarqueeVelocidad from '../components/MarqueeVelocidad.vue';

export default {
	
	name: 'Maquina',

	components: {

		InfoProduccion,
		InfoTiempos,
		BarraVelocidad,
		MenuMaquina,
		MarqueeVelocidad,

	},

	data(){

		return {

			id: this.$route.params.id || null,

			datos: [],
			datosSpin: [],
			estadosMaquinas: [],
			boletin: [],
			tiempos: [],
			registroVelocidad: [],
			operacion: [],
	
			producido: 0,
			metrosEncolado: 0,
			pulsosPLC: 0,
			errorPLC: 0,
			mtslinencoder: 0,
			mtslincorte: 0,
			velocidadMedia: 0,
			velocidadMediaCorrea: 0,
			anchotira: 0,
			merma: 0,

			velocidad: 'Calculando',
			codMaquina: '?',
			estadoMaquina: 'Desconocido',
			
			temporizadorDatos: null,
			temporizadorDatosReales: null,
			temporizadorSpin: null,

			debug: true, /* Si se marca esta opción, se consultarán solo una vez los datos al servidor de SPIN. */

			badgeEstados: {

				'SIN ESTADO': 'tag is-light is-secondary',
				'PREPARACION': 'tag is-light is-info',
				'MARCHA': 'tag is-light is-success',
				'TEST PARO': 'tag is-light is-secondary',
				'PARO': 'tag is-light is-danger',
				'TEST MARCHA': 'tag is-light is-secondary',
				'DESCANSO': 'tag is-light is-primary',
				'LIMPIEZA': 'tag is-light is-primary',

			},

		}

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

		cargarDatos: function(e){

			axios.get( "http://192.168.1.10:3000/maquina/" + this.id ).then( res => {

				this.datos = res.data[0];

				this.codMaquina = (this.datos.Maquina).substring((this.datos.Maquina).lastIndexOf(" ") + 1)

				axios.get( "http://192.168.1.10:3000/maquina/" + this.id + "/anchotira" ).then( res => {

					if( res && res.data && res.data[0].Anchotira ){

						this.anchotira = res.data[0].Anchotira;
						this.cargarBoletin();

					}

				} ).catch( err => {

					console.log( "[ERROR] No se han podido cargar los datos de la máquina. Error detallado: " + err );

				} )

				this.cargarDatosReales();

			} ).catch( err => {

				console.log( "[ERROR] No se han podido cargar los datos de la máquina. Error detallado: " + err );

			} )

		},

		cargarEstadosMaquina: function(e){

			axios.get( "http://192.168.1.10:3000/maquinas/estados" ).then( res => {

				res.data.forEach(tipo => {
					
					this.estadosMaquinas[ tipo.codEstado ] = tipo.Estado;

				});

			} ).catch( err => {

				console.log("[ERROR] No se han podido cargar las máquinas. Error detallado: " + err);

			} )			

		},

		cargarDatosReales: async function(e){

			try{

				axios.get( "http://192.168.1.10:3000/modbus/" + this.datos.Maquina.replace(/\s/g, '') ).then( res => {

					if( res.data && res.data.err ){

						this.errorPLC = 1;
						return;

					}

					this.errorPLC = 0;

					this.pulsosPLC = res.data[7];

					if( !this.debug ){
						this.temporizadorDatosReales = setTimeout( ()=>{ this.cargarDatosReales() }, 2000 )
					}

				} ).catch( err => {

					console.log( "[ERROR] No se han podido obtener los datos en tiempo real de la máquina." );

				} );


			}catch( err ){

				console.log( "[ERROR] No se han podido obtener los datos del PLC. Error detallado: " + err );

			}

		},

		cargarDatosSpin: async function(e){

			this.temporizadorSpin = null;

			try{

				let response = await axios.get( "http://192.168.1.10:3000/spincliente/" + this.codMaquina + "/datos" );

				if( response.data && response.data.datos ){

					let datosXML = (response.data).datos.replace(/(\r\n|\n|\r|\t|\u0002|\u0003)/gm,"");
					let datosArray = datosXML.split(" ");

					this.datosSpin = datosArray;

					this.velocidad = this.getNumeroFormateadoSPIN( this.datosSpin[4] );

					this.metrosEncolado = this.getNumeroFormateadoSPIN(this.datosSpin[5]);
					this.producido = this.getNumeroFormateadoSPIN(this.datosSpin[3]);

					this.mtslinencoder = (this.metrosEncolado) * this.anchotira / ( 3.1416 * this.boletin.DiametroInt )
					this.mtslincorte = ( this.producido ) * this.boletin.numCortes * this.boletin.Longitud / 1000

					this.tiempos[0] = this.getNumeroFormateadoSPIN(this.datosSpin[10]);
					this.tiempos[1] = this.getNumeroFormateadoSPIN(this.datosSpin[11]);
					this.tiempos[2] = this.getNumeroFormateadoSPIN(this.datosSpin[12]);
					this.tiempos[3] = this.getNumeroFormateadoSPIN(this.datosSpin[13]);
					this.tiempos[4] = this.getNumeroFormateadoSPIN(this.datosSpin[14].replace("/></DETALLEMAQUINA>", ""));

					this.velocidadMedia = this.mtslincorte / (this.tiempos[1]/60);
					this.velocidadMediaCorrea = this.velocidadMedia * 3.1416 * (this.boletin.DiametroInt / this.anchotira)

					this.estadoMaquina = ( this.datosSpin[2] ? this.getTextoFormateadoSPIN(this.datosSpin[2]): 'Desconocido' )

					this.merma = 100 * ((this.metrosEncolado) - (this.mtslincorte)) / this.metrosEncolado;

					this.$vs.loading.close('#div_con_carga > .con-vs-loading')

					if( !this.debug ){
						this.temporizadorSpin = setTimeout( () => { this.cargarDatosSpin() }, 1200 ); 
					}

				}


			}catch( err ){

				console.log( "[ERROR] No se han podido obtener los datos de SPIN. Error detallado: " + err );

			}

		},

		cargarBoletin: function(e){

			axios.get( "http://192.168.1.10:3000/maquina/" + this.id + "/boletinID" ).then( res => {

				if( res && res.data[0].Boletin ){
					
					let boletinID = res.data[0].Boletin

					axios.get( "http://192.168.1.10:3000/boletines/" + boletinID ).then( res => {

						this.boletin = res.data[0];

						axios.get( "http://192.168.1.10:3000/operacion/" + this.boletin.idOperacion ).then( res => {

							if( res && res.data ){

								this.operacion = res.data[0]

								this.cargarDatosSpin();
							
							}

						} ).catch( err => {

							console.log( "[ERROR] No se han podido cargar los datos de la operación de la máquina. Error detallado: " + err );

						} );

					} ).catch( err => {

						console.log( "[ERROR] No se pueden obtener los datos del boletín " + boletinID + ". Error detallado: " + err );

					} )

				}

			} ).catch( err => {

				console.log( "[ERROR] No se ha podido obtener el boletín de la máquina. Error detallado: " + err );

			} )

		}
	
	},

	mounted(){

		this.$vs.loading({
			container: '#div_con_carga',
			scale: 0.6
		})

		this.cargarEstadosMaquina();
		this.cargarDatos();
		
	},

	beforeUnmount(){

		clearInterval( this.temporizadorDatos )
		clearInterval( this.temporizadorDatosReales )
		clearInterval( this.temporizadorSpin )

	},

	unmounted(){

		this.temporizadorDatos = null;
		this.temporizadorDatosReales = null;
		this.temporizadorSpin = null;

	}

}
</script>

<style scoped>

	li {

		list-style: none;
		
	}

	.estado-maquina{

		font-size: 0.7em;

		float: right;

	}

	.col-12{
		margin-bottom: 20px;
	}

	.card{
		width: 80%;
		margin:0 auto;

		transition: all .3s;
	}

	h5{

		font-size: 0.8em;

	}

</style>