<template>
	
	<div>

		<div style="margin-top:-50px;" class="card-group row">

			<div class="col-12 col-sm-12 col-md-6 mx-auto mt-2">

				<vs-card>


					<h5><i class="bi bi-activity"></i> Pulsos PLC</h5>

					<div v-if="errorPLC === 0" class="text-center">

						<h4><span class="text-primary">{{ velocidadReal || 0 }}</span></h4>

					</div>
					<div v-else>

						<vs-alert color="danger">
							<span>PLC <b>inaccesible</b> por el puerto 502.</span>
						</vs-alert>

					</div>

				</vs-card>

			</div>


			<div class="col-12 col-sm-12 col-md-6 mx-auto mt-2">

				<vs-card :style="getStyleFromVelocidad()">

						<h5><i class="bi bi-speedometer"></i> Velocidad</h5>

						<div class="text-center">

							<h4><span>{{ 

								esMandriladora ? (

									tipoVelocidad === 1 ? 
									velocidad !== 'Calculando' ? ( velocidadCorrea.toFixed(2)).replace(".",",") + "("+ Math.floor( velocidadMedia ) +").L" : velocidad :
									velocidad !== 'Calculando' ? ( velocidad.toFixed(2).replace(".",",") + "("+ Math.floor(velocidadMediaCorrea) +").c" ) : velocidad

								) :
								velocidad !== 'Calculando' ? ( velocidad.toFixed(2).replace(".",",") + "("+ Math.floor(velocidadMedia) +").L" ) : velocidad

								
							}}</span></h4>

						</div>

				</vs-card>

			</div>

			<div class="col-12 col-sm-12 col-md-6 mt-2">

				<vs-card>

					<h5><i class="bi bi-speedometer2"></i> M. Encoder</h5>

					<div class="text-center">

						<h4><span>{{ metrosEncolado }}</span></h4>

					</div>


				</vs-card>

			</div>

			<div class="col-12 col-sm-12 col-md-6 mt-2">

				<vs-card>

					<h5><i class="bi bi-boxes"></i> C. Producida</h5>

					<div class="text-center">

						<h4><span>{{ (cantidadProducida*(numCortes || 0)) + "/" + cantidadBoletin }}</span></h4>

					</div>
				</vs-card>

			</div>

		</div>

	</div>

</template>

<script>
export default {
	
	name: 'InfoProduccion',

	props: [ 'velocidad', 'velocidadMedia', 'velocidadCorrea', 'velocidadMediaCorrea', 'velocidadReal', 'metrosEncolado', 'numCortes', 'cantidadBoletin', 'cantidadProducida', 'errorPLC', 'esMandriladora' ],

	data(){

		return({

			tipoVelocidad: 1,

		})

	},

	methods: {

		getStyleFromVelocidad: function( ){

			if( this.velocidad === 0 || this.velocidad <= 0 || this.velocidad < 20 ){

				return 'background-color:rgba(255,0,0,0.08); color:rgba(150,0,0,0.5);'

			}else if( this.velocidad >= 20 && this.velocidad < 40 ){

				return 'background-color:rgba(255,150,0,0.08); color:rgba(255,150,0,0.5);'

			}else{

				return 'background-color:rgba(0,255,0,0.08); color:rgba(0,150,0,0.5);'

			}

		},

		cambiarTipoVelocidad: function(){

			(this.esMandriladora && this.tipoVelocidad === 1) ? (this.tipoVelocidad = 2) : this.tipoVelocidad = 1;

		}

	}

}
</script>

<style scoped>

	h4{

		font-weight:100

	}

</style>