<template>
	
	<div style="user-select:none">

		<div v-if="datos">

			<div class="row">

				<div class="col-12 col-md-10">

					<div v-if="datosDesactualizados">
						<el-alert :closable="false" title="La información de la máquina no está actualizada. Este cuadro desaparecerá cuando se actualice." class="mb-2" type="warning" show-icon />
					</div>

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
									
									<BarraVelocidad @cambiarTipoVelocidad="cambiarTipoVelocidad" :esMandriladora="datos.idTipoMaquina == 1 ? true : false" :indicadorVelocidad="tipoVelocidad" :merma="merma" :velocidad="(datos.idTipoMaquina == 1 && tipoVelocidad == 1 ? velocidadActual : velocidad)"/>

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

								<InfoProduccion ref="infoProd" @cambiarTipoVelocidad="cambiarTipoVelocidad" :esMandriladora="datos.idTipoMaquina == 1 ? true : false" :velocidadMediaCorrea="velocidadMediaCorrea" :velocidadMedia="velocidadMedia" :velocidadCorrea="velocidadActual" :velocidad="velocidad" :numCortes="boletin.numCortes" :cantidadBoletin="boletin.CantidadBoletin ? boletin.CantidadBoletin : 0" :cantidadProducida="producido" :metrosEncolado="metrosEncolado" :errorPLC="errorPLC" :velocidadReal="pulsosPLC"/>

							</div>

							<GraficoGeneral :datosGrafico="testData"/>										

						</div>
						<div v-else-if="ventana === 2">

							<!-- 
								VELOCIDAD DE LA MÁQUINA
							-->
							<div v-if="datos.idTipoMaquina < 3">

								<div v-if="velocidad === 'Calculando'">

									<BarraVelocidad :cargando="true"/>

								</div>
								<div class="mt-3" v-else>

									<BarraVelocidad @cambiarTipoVelocidad="cambiarTipoVelocidad" :esMandriladora="datos.idTipoMaquina == 1 ? true : false" :indicadorVelocidad="tipoVelocidad" :merma="merma" :velocidad="(datos.idTipoMaquina == 1 && tipoVelocidad == 1 ? velocidadActual : velocidad)"/>

								</div>

							</div>

							<!-- 
								TIEMPOS DE LA MÁQUINA (PREPARACIÓN, PARADA, MARCHA...)
							-->
							<div class="mt-2 text-left">

								<InfoTiempos :tiempos="tiempos"/>

							</div>

							<template class="mt-2" v-if="operariosAlta && operariosAlta.length > 0">

								<ListaOperariosAlta :idMaquina="id" :listaOperarios="operariosAlta"/>

							</template>

						</div>
						<div v-else-if="ventana === 2.1">

							<!-- 
								VELOCIDAD DE LA MÁQUINA
							-->
							<div v-if="datos.idTipoMaquina < 3">

								<div v-if="velocidad === 'Calculando'">

									<BarraVelocidad :cargando="true"/>

								</div>
								<div class="mt-3" v-else>

									<BarraVelocidad @cambiarTipoVelocidad="cambiarTipoVelocidad" :esMandriladora="datos.idTipoMaquina == 1 ? true : false" :indicadorVelocidad="tipoVelocidad" :merma="merma" :velocidad="(tipoVelocidad == 1 ? velocidadActual : velocidad)"/>

								</div>

							</div>

							<!-- 
								TIEMPOS DE LA MÁQUINA (PREPARACIÓN, PARADA, MARCHA...)
							-->
							<div class="mt-2 text-left">

								<InfoTiempos :tiempos="tiempos"/>

							</div>	

							<h3>% Merma</h3>
							<p>Determina el % de la merma respecto del total producido.</p>

							<div class="text-center">

								<el-date-picker
									v-model="fecha"
									type="date"
									placeholder="Fecha"
									:default-value="(new Date())"
									@change="mostrarMerma"
								/>
								
								<el-select class="ml-2 mt-2" @change="mostrarMerma" v-model="selectorTurno" placeholder="Turno">												

									<el-option
										key="1"
										label="T1-Mañana"
										value="T1-Mañana"
									/>
									<el-option
										key="2"
										label="T2-Tarde"
										value="T2-Tarde"
									/>
									<el-option
										key="3"
										label="T3-Noche"
										value="T3-Noche"
									/>																								

								</el-select>

							</div>

							<div class="mt-2">

								<div v-if="datosIndicadores.length > 0">
									
									<br>
									<h5 class="text-center"><b>% Merma:</b> {{ 100 * ( datosIndicadores[0].SumMtsEnc - datosIndicadores[0].SumMtsFab ) / datosIndicadores[0].SumMtsEnc }}</h5>

								</div>
								<div v-else>

									<el-alert title="No hay datos del % Merma generado para esa fecha y ese turno." type="warning" show-icon />

								</div>

							</div>

						</div>

					</vs-card>

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
import GraficoGeneral from '../components/GraficoGeneral.vue';

export default {
	
	name: 'Maquina',

	components: {

		InfoProduccion,
		InfoTiempos,
		BarraVelocidad,
		MenuMaquina,
		MarqueeVelocidad,
		ListaOperariosAlta,
		InfoCliente,
		InfoEstadoMaquina,
		GraficoGeneral,

	},

	data(){

		return {

			id: this.$route.params.id || null,
			selectorTurno: null,
			ventana: 1,

			datos: [],
			datosSpin: [],
			datosIndicadores: [],
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
			fecha: "",

			debug: false, /* Si se marca esta opción, se consultarán solo una vez los datos al servidor de SPIN. */

			datosDesactualizados: false,

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

						if( this.datosDesactualizados ){ this.datosDesactualizados = false; }

					}

				}else if( response.data.err ){

					console.log( response.data.err );

				}


			}catch( err ){

				this.datosDesactualizados = true;

				setTimeout( function( _self ){
					_self.cargarDatosSpin();
				}, 5000, this )

				console.log( "[ERROR] La consulta a SPIN ha fallado. Se realizará reintento en 5 segundos..." );
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

				this.operariosAlta = res.data.sort((a,b)=>{ return a.Puesto < 1 });

			} ).catch( err =>{

				console.log( "[ERROR] No se han podido obtener los operarios dados de alta en la maquina. Error detallado: " + err );

			} )

		},

		cambiarVentana: function(nueva){

			this.ventana = nueva

		},

		cambiarTipoVelocidad: function(){

			this.tipoVelocidad = (this.tipoVelocidad == 1 ? 2 : 1);
			this.$refs.infoProd.cambiarTipoVelocidad()

		},

		mostrarMerma: function(){

			if( this.fecha && this.selectorTurno ){

				axios.post( "http://" + process.env.VUE_APP_API + ":3000/maquina/" + this.id + "/merma",{
					
					fecha: new Date(this.fecha).toLocaleDateString('en-US').replace("/","-"),
					turno: this.selectorTurno

				} ).then( res => {

					this.datosIndicadores = res.data;

				} ).catch( err => {

					console.log( "[ERROR] No se ha podido obtener el % Merma. Error detallado: " + err );

				} )
			}

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

	unmounted(){

		clearInterval( this.temporizadorDatos )
		clearInterval( this.temporizadorDatosReales )
		clearInterval( this.temporizadorSpin )

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

	.table > :not(:first-child){ border:none; }
	.table th{ border:none; }
	.table-responsive { overflow-x: hidden; }

</style>