<template>
	
	<div>

		<div v-if="datos">

			<div class="card p-3">

				<!-- 
					NOMBRE Y ESTADO DE LA MAQUINA
				 -->
				<h3>{{ datos.Maquina }}

					<span class="estado-maquina" v-if="estadoMaquina === 'Desconocido'"><span class="tag is-light is-secondary">Cargando estado...</span></span>
					<span class="estado-maquina" v-else><span :class="badgeEstados[estadoMaquina]">{{ estadoMaquina }}</span></span>

				</h3>

				<!-- 
					VELOCIDAD DE LA MÁQUINA
				 -->
				<div v-if="velocidad === 'Calculando'">

					<p><b>Velocidad:</b> <button style="border:none;" class="button is-loading is-small">Cargando</button></p>

				</div>
				<div v-else>

					<BarraVelocidad :velocidad="velocidad"/>

				</div>

				<!-- 
					TIEMPOS DE LA MÁQUINA (PREPARACIÓN, PARADA, MARCHA...)
				 -->
				<div class="mt-2 text-left">

					<InfoTiempos :tiempos="tiempos"/>

				</div>

				<!-- 
					TARJETAS CON VELOCIDAD, PULSOS, CANTIDAD PRODUCIDA, ETC
				 -->
				<div class="mt-5">

					<InfoProduccion :velocidad="velocidad" :numCortes="boletin.numCortes" :cantidadBoletin="boletin.CantidadBoletin ? boletin.CantidadBoletin : 0" :cantidadProducida="producido" :metrosEncolado="metrosEncolado" :errorPLC="errorPLC" :velocidadReal="pulsosPLC"/>

				</div>

			</div>

			<br>

<!-- 			<p class="text-muted">Más información de la máquina.</p>

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

	</div>

</template>

<script>
import axios from 'axios';
import InfoProduccion from '../components/InfoProduccion.vue';
import InfoTiempos from '../components/InfoTiempos.vue';
import BarraVelocidad from '../components/BarraVelocidad.vue';

export default {
	
	name: 'Maquina',

	components: {

		InfoProduccion,
		InfoTiempos,
		BarraVelocidad

	},

	data(){

		return {

			datos: [],
			informeVelocidad: [],
			datosSpin: [],
			pulsosPLC: 0,
			tiempoActualizado: '',
			velocidad: 'Calculando',
			codMaquina: '?',
			estadoMaquina: 'Desconocido',
			ultActualizacion: '?',
			estadosMaquinas: [],
			tiempos: [],
			producido: 0,
			metrosEncolado: 0,
			boletin: [],
			id: this.$route.params.id || null,

			temporizadorDatos: null,
			temporizadorDatosReales: null,
			temporizadorSpin: null,

			errorPLC: 0,
			
			mtslinencoder: 0,
			mtslincorte: 0,
			velocidadMedia: 0,
			velocidadMediaCorrea: 0,

			anchotira: 0,

			badgeEstados: {

				'SIN ESTADO': 'tag is-light is-secondary',
				'PREPARACION': 'tag is-light is-info',
				'MARCHA': 'tag is-light is-success',
				'TEST PARO': 'tag is-light is-secondary',
				'PARO': 'tag is-light is-danger',
				'TEST MARCHA': 'tag is-light is-secondary',
				'DESCANSO': 'tag is-light is-primary',
				'LIMPIEZA': 'tag is-light is-primary',

			}

		}

	},

	methods: {

		getNumeroFormateadoSPIN: function (texto){

			return +(texto.split("=")[1]).substring(1, (texto.split("=")[1]).length-1).replace(",",".");

		},

		getTextoFormateadoSPIN: function (texto){

			return (texto.split("=")[1]).substring(1, (texto.split("=")[1]).length-1);

		},

		cargarDatos: function(e){

			axios.get( "http://192.168.1.10:3000/maquina/" + this.id ).then( res => {

				this.datos = res.data[0];

				this.codMaquina = (this.datos.Maquina).substring((this.datos.Maquina).lastIndexOf(" ") + 1)

				if( !this.temporizadorDatos ){

					this.temporizadorDatos = setInterval( () => {

						this.cargarDatosReales();

					}, 2000 )

				}

				axios.get( "http://192.168.1.10:3000/maquina/" + this.id + "/anchotira" ).then( res => {

					if( res && res.data && res.data[0].Anchotira ){

						this.anchotira = res.data[0].Anchotira;
						this.cargarBoletin();

					}

				} ).catch( err => {

					console.log( "[ERROR] No se han podido cargar los datos de la máquina. Error detallado: " + err );

				} )

				this.cargarDatosSpin();

			} ).catch( err => {

				console.log( "[ERROR] No se han podido cargar los datos de la máquina. Error detallado: " + err );

			} )

		},

		cargarVelocidad: function(e){

			axios.get( "http://192.168.1.10:3000/maquina/" + this.id + "/velocidades" ).then( res => {

				this.informeVelocidad = res.data[0];
 
			} ).catch( err => {

				console.log( "[ERROR] No se han podido cargar los datos de la máquina. Error detallado: " + err );

			} )

		},

		getVelocidad: function(e){

			axios.get( "http://192.168.1.10:3000/maquina/" + this.id + "/velocidad" ).then( res => {

				this.velocidad =  res.data[0].Velocidad;
				this.ultActualizacion = res.data[0].Fecha;
				
			} ).catch( err => {

				console.log("No se puede obtener la velocidad de la maquina. Error detallado: " + err);

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

		cargarDatosReales: function(e){

			axios.get( "http://192.168.1.10:3000/modbus/" + this.datos.Maquina.replace(/\s/g, '') ).then( res => {

				if( res.data && res.data.err ){

					this.errorPLC = 1;
					return;

				}

				this.errorPLC = 0;

				this.pulsosPLC = res.data[7];

				this.tiempoActualizado = res.data[0] + "-" + res.data[1] + "-" + res.data[2];

				if( !this.temporizadorDatosReales ){
					this.temporizadorDatosReales = setTimeout( () => { this.cargarDatosReales() }, 3500 );
				}

			} ).catch( err => {

				console.log( "[ERROR] No se han podido obtener los datos en tiempo real de la máquina." );

			} )

		},

		cargarDatosSpin: function(e){

			axios.get( "http://192.168.1.10:3000/spincliente/" + this.codMaquina + "/datos" ).then( res => {

				if( res.data && res.data.datos ){

					let datosXML = (res.data).datos.replace(/(\r\n|\n|\r|\t|\u0002|\u0003)/gm,"");
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
					this.velocidadMediaCorrea = this.velocidadMedia * 3.1416 * this.boletin.DiametroInt / this.anchotira

					this.estadoMaquina = ( this.datosSpin[2] ? this.getTextoFormateadoSPIN(this.datosSpin[2]): 'Desconocido' )

				}
				
				if( !this.temporizadorSpin ){

					this.temporizadorSpin = setInterval( ()=>{ this.cargarDatosSpin(); }, 1400 )

				}

			} ).catch( err =>{

				console.log( "[ERROR] No se han podido obtener los datos de SPIN. Error detallado: " + err );

			} )

		},

		cargarBoletin: function(e){

			axios.get( "http://192.168.1.10:3000/maquina/" + this.id + "/boletinID" ).then( res => {

				if( res && res.data[0].Boletin ){
					
					let boletinID = res.data[0].Boletin

					axios.get( "http://192.168.1.10:3000/boletines/" + boletinID ).then( res => {

						this.boletin = res.data[0];

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

		this.cargarEstadosMaquina();
		this.cargarDatos();
		this.cargarVelocidad();
		this.getVelocidad();
		
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
	}

</style>