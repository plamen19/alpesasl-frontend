<template>
	
	<div>

		<div v-if="datos">

			<div class="row">

				<div class="col-12 col-md-10">

					<vs-card id="div_con_carga" class="p-3 vs-con-loading__container">

						<!-- 
							NOMBRE Y ESTADO DE LA MAQUINA
						-->
						<h3>{{ datos.Maquina }} <InfoEstadoMaquina :estadoMaquina="estadoMaquina"/></h3>

						<div v-if="ventana === 1">

							<InfoCliente :cliente="operacion.Cliente" :descripcion="operacion.Descripcion"/>

							<!-- 
								VELOCIDAD DE LA MÁQUINA
							-->
							<div v-if="datos.idTipoMaquina < 3">

								<div v-if="velocidad === 'Calculando'">

									<BarraVelocidad :cargando="true"/>

								</div>
								<div class="mt-3" v-else>
									
									<BarraVelocidad :merma="merma" :velocidad="(tipoVelocidad == 1 ? velocidadActual : velocidad)"/>

								</div>

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

								<InfoProduccion @cambiarTipoVelocidad="cambiarTipoVelocidad" :esMandriladora="datos.idTipoMaquina == 1 ? true : false" :velocidadMediaCorrea="velocidadMediaCorrea" :velocidadMedia="velocidadMedia" :velocidadCorrea="velocidadActual" :velocidad="velocidad" :numCortes="boletin.numCortes" :cantidadBoletin="boletin.CantidadBoletin ? boletin.CantidadBoletin : 0" :cantidadProducida="producido" :metrosEncolado="metrosEncolado" :errorPLC="errorPLC" :velocidadReal="pulsosPLC"/>

							</div>

							<el-collapse accordion>
								<el-collapse-item title="Gráfico general">

									<LineChart :height="200" :chartData="testData" />

								</el-collapse-item>
							</el-collapse>												

						</div>
						<div v-else-if="ventana === 2">

							<InfoCliente :cliente="operacion.Cliente" :descripcion="operacion.Descripcion"/>

							<!-- 
								VELOCIDAD DE LA MÁQUINA
							-->
							<div v-if="datos.idTipoMaquina < 3">

								<div v-if="velocidad === 'Calculando'">

									<BarraVelocidad :cargando="true"/>

								</div>
								<div class="mt-3" v-else>

									<BarraVelocidad :merma="merma" :velocidad="(tipoVelocidad == 1 ? velocidadActual : velocidad)"/>

								</div>

							</div>

							<!-- 
								TIEMPOS DE LA MÁQUINA (PREPARACIÓN, PARADA, MARCHA...)
							-->
							<div class="mt-2 text-left">

								<InfoTiempos :tiempos="tiempos"/>

							</div>

							<template class="mt-2" v-if="operariosAlta && operariosAlta.length > 0">

								<ListaOperariosAlta :listaOperarios="operariosAlta"/>

							</template>

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

					<MenuMaquina @cambiarVentana="cambiarVentana"/>					

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
import ListaOperariosAlta from '../components/ListaOperariosAlta.vue';
import InfoCliente from '../components/InfoCliente.vue';
import InfoEstadoMaquina from '../components/InfoEstadoMaquina.vue';

import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
	
	name: 'Maquina',

	components: {

		InfoProduccion,
		InfoTiempos,
		BarraVelocidad,
		MenuMaquina,
		MarqueeVelocidad,
		ListaOperariosAlta,
		LineChart,
		InfoCliente,
		InfoEstadoMaquina

	},

	data(){

		return {

			id: this.$route.params.id || null,
			ventana: 1,

			datos: [],
			datosSpin: [],
			estadosMaquinas: [],
			boletin: [],
			tiempos: [],
			registroVelocidad: [],
			operacion: [],
			operariosAlta: [],
	
			tipoVelocidad: 1,
			producido: 0,
			metrosEncolado: 0,
			pulsosPLC: 0,
			errorPLC: 0,
			mtslinencoder: 0,
			mtslincorte: 0,
			velocidadMedia: 0,
			velocidadMediaCorrea: 0,
			velocidadActual: 0,
			anchotira: 0,
			merma: 0,
			mtsafabricar: 0,
			vlinealconc: 0,

			velocidad: 'Calculando',
			estadoMaquina: 'Desconocido',
			
			temporizadorDatos: null,
			temporizadorDatosReales: null,
			temporizadorSpin: null,

			debug: true, /* Si se marca esta opción, se consultarán solo una vez los datos al servidor de SPIN. */

			testData: {
				labels: [],
				datasets: [
					{
						label: 'Velocidad',
						data: [],
						backgroundColor: '#33beff',
						borderColor: '#33beff',
						tension: 0
					},
					{
						label: 'C. Producida',
						data: [],
						backgroundColor: ['#33ffa8', '#33ffa8', '#33ffa8', '#33ffa8', '#33ffa8'],
						borderColor: '#33ffa8',
						tension: 0
					},	
					{
						label: '% Merma',
						data: [],
						backgroundColor: ['#ff3633', '#ff3633', '#ff3633', '#ff3633', '#ff3633'],
						tension: 0
					},					
				],	
				
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

		calcularTiempos: function(arrayTiempos){ 
			this.tiempos = [

				this.getNumeroFormateadoSPIN( arrayTiempos[0] ),
				this.getNumeroFormateadoSPIN( arrayTiempos[1] ),
				this.getNumeroFormateadoSPIN( arrayTiempos[2] ),
				this.getNumeroFormateadoSPIN( arrayTiempos[3] ),
				this.getNumeroFormateadoSPIN( arrayTiempos[4] ),
				!isFinite(60 * this.mtsafabricar / this.vlinealconc) ? 0 : 60 * this.mtsafabricar / this.vlinealconc,
				!isFinite(this.boletin.TiempoPreparacionConcedido * 3600) ? 0 : this.boletin.TiempoPreparacionConcedido * 3600,
			];
		},

		calcularMetros: function(){

			this.mtslinencoder = ( this.datos.idTipoMaquina == 1 ? (this.metrosEncolado) * this.anchotira / ( 3.1416 * this.boletin.DiametroInt ) : this.metrosEncolado );
			this.mtslincorte = ( this.producido ) * this.boletin.numCortes * this.boletin.Longitud / 1000
			this.mtsafabricar = this.boletin.CantidadBoletin * this.boletin.Longitud / 1000;
			
		},

		calcularVelocidades: function(){

			this.velocidadMedia = isFinite(( this.datos.idTipoMaquina == 1 ? (this.mtslincorte / (this.tiempos[3]/60)) : ((this.producido) * this.boletin.Longitud / 1000) / (this.tiempos[3]/60) )) ? Math.ceil(( this.datos.idTipoMaquina == 1 ? (this.mtslincorte / (this.tiempos[3]/60)) : ((this.producido) * this.boletin.Longitud / 1000) / (this.tiempos[3]/60) )) : 0;
			this.velocidadMediaCorrea = isFinite(Math.floor(this.velocidadMedia * 3.1416 * this.boletin.DiametroInt / this.anchotira)) ? Math.floor(this.velocidadMedia * 3.1416 * this.boletin.DiametroInt / this.anchotira) : 0;
			this.velocidadActual = this.velocidad * ( this.anchotira / ( 3.1416 * this.boletin.DiametroInt ) )
			this.vlinealconc = this.boletin.VelocidadBoletin * (this.anchotira / (3.1416 * this.boletin.DiametroInt))

		},

		calcularMerma: function(){
			this.merma = 100 * ((this.mtslinencoder) - (this.mtslincorte)) / this.mtslinencoder;
		},

		insertarDatosGrafico: function(){

			this.testData.labels = [...this.testData.labels, this.getTiempoFormateado( this.tiempos[1] )]; 
			this.testData.datasets[0].data = [...this.testData.datasets[0].data, this.velocidad.toFixed(2)];
			this.testData.datasets[1].data = [...this.testData.datasets[1].data, this.producido];
			this.testData.datasets[2].data = [...this.testData.datasets[2].data, this.merma];

		},

		resetearGrafico: function(){  

			this.testData.labels.shift(0,5);
			this.testData.datasets[0].data.shift(0,5);
			this.testData.datasets[1].data.shift(0,5);

		},

		cargarEstadosMaquina: function(e){

			axios.get( "http://"+ process.env.VUE_APP_API +":3000/maquinas/estados" ).then( res => {

				res.data.forEach(tipo => {
					
					this.estadosMaquinas[ tipo.codEstado ] = tipo.Estado;

				});

			} ).catch( err => {

				console.log("[ERROR] No se han podido cargar las máquinas. Error detallado: " + err);

			} )			

		},

		cargarDatos: function(e){

			axios.get( "http://"+ process.env.VUE_APP_API +":3000/maquina/" + this.id ).then( res => {

				this.datos = res.data[0];

				if( this.datos.idTipoMaquina >= 3 ){

					this.cargarBoletin();
					this.cargarOperarios();
					return;

				}

				axios.get( "http://"+ process.env.VUE_APP_API +":3000/maquina/" + this.id + "/anchotira" ).then( res => {

					if( res && res.data && res.data[0].Anchotira ){

						this.anchotira = res.data[0].Anchotira;

						console.log( "Ancho tira cargado" );

						this.cargarBoletin();
						this.cargarOperarios();

					}

				} ).catch( err => {

					console.log( "[ERROR] No se han podido cargar los datos de la máquina. Error detallado: " + err );

				} )

				this.cargarDatosReales();

			} ).catch( err => {

				console.log( "[ERROR] No se han podido cargar los datos de la máquina. Error detallado: " + err );

			} )

		},

		cargarDatosReales: async function(e){

			try{

				axios.get( "http://"+ process.env.VUE_APP_API +":3000/modbus/" + this.datos.codMaquina ).then( res => {

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

				let response = await axios.get( "http://"+ process.env.VUE_APP_API +":3000/spincliente/" + this.datos.codMaquina + "/datos" );

				if( response.data && response.data.datos ){

					let datosXML = (response.data).datos.replace(/(\r\n|\n|\r|\t|\u0002|\u0003)/gm,"");

					if( datosXML ){

						this.datosSpin = datosXML.split(" ");

						this.velocidad = this.getNumeroFormateadoSPIN( this.datosSpin[4] );
						this.metrosEncolado = this.getNumeroFormateadoSPIN(this.datosSpin[5]);
						this.producido = this.getNumeroFormateadoSPIN(this.datosSpin[3]);
						this.estadoMaquina = ( this.datosSpin[2] ? this.getTextoFormateadoSPIN(this.datosSpin[2]): 'Desconocido' )

						this.calcularMerma();
						this.calcularMetros();
						this.calcularTiempos( [ this.datosSpin[10], this.datosSpin[11], this.datosSpin[12], this.datosSpin[13], this.datosSpin[14].replace("/></DETALLEMAQUINA>", "") ] );
						this.calcularVelocidades();
						this.insertarDatosGrafico();

						if( this.testData.labels.length >= 15 ){ this.resetearGrafico(); }
						
						this.$vs.loading.close('#div_con_carga > .con-vs-loading');

						if( !this.debug ){
							this.temporizadorSpin = setTimeout( () => { this.cargarDatosSpin(); }, 1200 ); 
						}

					}

				}


			}catch( err ){

				console.log( "[ERROR] No se han podido obtener los datos de SPIN. Error detallado: " + err );

			}

		},

		cargarBoletin: function(e){

			axios.get( "http://"+ process.env.VUE_APP_API +":3000/maquina/" + this.id + "/boletinID" ).then( res => {

				if( this.datos.idTipoMaquina >= 3 ){
					this.cargarDatosSpin();
					return;
				}

				if( res && res.data[0].Boletin ){
					
					let boletinID = res.data[0].Boletin

					axios.get( "http://"+ process.env.VUE_APP_API +":3000/boletines/" + boletinID ).then( res => {

						this.boletin = res.data[0];

						axios.get( "http://"+ process.env.VUE_APP_API +":3000/operacion/" + this.boletin.idOperacion ).then( res => {

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

		},

		cargarOperarios: function(e){

			axios.get( "http://"+ process.env.VUE_APP_API +":3000/maquina/" + this.id + "/operarios" ).then( res => {

				this.operariosAlta = res.data;

			} ).catch( err =>{

				console.log( "[ERROR] No se han podido obtener los operarios dados de alta en la maquina. Error detallado: " + err );

			} )

		},

		cambiarVentana: function(nueva){

			this.ventana = nueva

		},

		cambiarTipoVelocidad: function(tipo_velocidad){

			this.tipoVelocidad = tipo_velocidad;

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

	},

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

</style>