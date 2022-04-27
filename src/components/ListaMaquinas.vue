<template>
	
	<div>

		<div class="row">

			<div v-for="maquina in (maquinasActualizadas ? maquinasActualizadas : data)" :key="maquina.idMaquina" class="col-12 col-sm-6 col-md-4">

				<div class="card">

					<div :class="maquina.PLC == 1 ? '' : 'sinplc'" class="card-header">

						<h5 class="p-1">{{ maquina.Maquina }}</h5>

					</div>

					<div class="card-body">

						<li><b>Planta</b>: {{ maquina.Planta }}</li>
						<li v-if="tiposMaquinas.length > 0"><b>Tipo:</b> {{ tiposMaquinas.filter( el => { return el.id == maquina.idTipoMaquina } )[0].nombre || "?" }}</li>
						<li><b>Estado:</b> <span 
							:class="datosSpin && datosSpin[ maquina.codMaquina ] && datosSpin[ maquina.codMaquina ].estado ? tagsEstado[ datosSpin[ maquina.codMaquina ].estado ] : 'tag is-light is-info'">
							{{ datosSpin && datosSpin[ maquina.codMaquina ] && datosSpin[ maquina.codMaquina ].estado ? datosSpin[ maquina.codMaquina ].estado : "?" }}</span></li>
						<li><b>KMetros:</b> {{ maquina.KMetros }}</li>
						<li><b>KKilos:</b> {{ maquina.KKilos }}</li>

						<br>
						
						<router-link :to="{ name: 'Maquina', params: { id: maquina.idMaquina } }" >

							<el-button class="w-25" type="success" plain>Acceder</el-button>

						</router-link>

					</div>

				</div>

			</div>

		</div>

		
	</div>

</template>

<script>
import axios from 'axios';

export default {

	name: 'ListaMaquinas',

	props: [ "data", "tiposMaquinas" ],
	
	data(){

		return({

			maquinasActualizadas: null,
			datosSpin: [],

			tagsEstado: {

				"PARO" : 'tag is-light is-danger',
				"MARCHA": 'tag is-light is-success',
				"PREPARACION": 'tag is-light is-info',
				"Desconocido": 'tag is-light'

			}

		})

	},

	methods: {

		getTextoFormateadoSPIN: function (texto){

			return (texto.split("=")[1]).substring(1, (texto.split("=")[1]).length-1);

		},		

		filtrarMaquinas: function( ndata ){

			this.maquinasActualizadas = ndata;

		},

		getDatosSpin: function(){

			console.log(this.data);

			this.data.forEach(maq => {
				
				axios.get( "http://" + process.env.VUE_APP_API + ":3000/spincliente/" + maq.codMaquina + "/datos" ).then( res => {

					if( res.data && !res.data.err ){


						let datosXML = (res.data).datos.replace(/(\r\n|\n|\r|\t|\u0002|\u0003)/gm,"");

						if( datosXML ){

							
							let datosSpin = datosXML.split(" ");

							this.datosSpin[ maq.codMaquina ] = {

								estado: ( datosSpin[2] ? this.getTextoFormateadoSPIN(datosSpin[2]): 'Desconocido' )

							};

						}

					}

				} ).catch( err => {

					console.log( "[ERROR] No se han podido cargar los datos de SPIN de " + maq.codMaquina + ". Error detallado: " + err );

				} )

			});

		}

	},

	mounted(){

		let _self = this;

		setTimeout(function(){

			_self.getDatosSpin();

		}, 1200)

	}

}
</script>

<style scoped>

	th,td{
		padding:20px;
	}

	a{
		text-decoration: none;
	}

	.card{

		margin-bottom: 50px;

		transition: all .3s;

	}

	.sinplc:hover{

		background-color: rgba(200,0,0,0.6);
		color: #fff;

	}

	.card:hover .card-header{

		background-color: rgba(0,0,0,0.85);
		color: #fff;

	}

	.card h5{
		font-size: 0.8em;
	}
	
	li{

		list-style-type: none;

		margin-bottom: 5px;

	}

	span{

		font-size: 0.85em;

	}

	.card-header{

		background-color: rgba(42, 42, 46, 0.8);
		color:#fff;

		transition: all .3s;

	}

	.card li{

		font-size: 0.8em;

	}

</style>