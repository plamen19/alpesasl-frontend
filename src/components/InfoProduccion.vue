<template>
	
	<div>

		<div style="margin-top:-50px;" class="card-group row">

			<div class="col-12 col-sm-12 col-md-6 mx-auto mt-2">

				<div class="card">

					<div class="card-header">

						<h5><i class="bi bi-activity"></i> Pulsos PLC</h5>

					</div>

					<div class="card-body">

						<div v-if="errorPLC === 0" class="text-center">

							<h4><span class="text-primary">{{ velocidadReal || 0 }}</span></h4>

						</div>
						<div v-else>

							<div class="notification is-light is-danger">
								No hay conexión con el puerto <b>502</b> del PLC.
							</div>

						</div>

					</div>

				</div>

			</div>


			<div class="col-12 col-sm-12 col-md-6 mx-auto mt-2">

				<div class="card">

					<div class="card-header">

						<h5><i class="bi bi-speedometer"></i> Velocidad</h5>

					</div>

					<div :style="getStyleFromVelocidad()" class="card-body">

						<div class="text-center">

							<h4><span>{{ velocidad !== 'Calculando' ? (velocidad.toFixed(2)).replace(".",",") + "("+velocidadMedia.toFixed(2)+").L" : velocidad }}</span></h4>

						</div>

					</div>

				</div>

			</div>

			<div class="col-12 col-sm-12 col-md-6 mt-2">

				<div class="card">

					<div class="card-header">

						<h5><i class="bi bi-speedometer2"></i> M. Encolado</h5>

					</div>

					<div class="card-body">

						<div class="text-center">

							<h4><span>{{ metrosEncolado }}</span></h4>

						</div>

					</div>

				</div>

			</div>

			<div class="col-12 col-sm-12 col-md-6 mt-2">

				<div class="card">

					<div class="card-header">

						<h5><i class="bi bi-boxes"></i> C. Producida</h5>

					</div>

					<div class="card-body">

						<div class="text-center">

							<h4><span>{{ (cantidadProducida*(numCortes || 0)) + "/" + cantidadBoletin }}</span></h4>

						</div>

					</div>

				</div>

			</div>

		</div>

	</div>

</template>

<script>
export default {
	
	name: 'InfoProduccion',

	props: [ 'velocidad', 'velocidadMedia', 'velocidadReal', 'metrosEncolado', 'numCortes', 'cantidadBoletin', 'cantidadProducida', 'errorPLC' ],

	methods: {

		getStyleFromVelocidad: function( ){

			if( this.velocidad === 0 || this.velocidad <= 0 || this.velocidad < 20 ){

				return 'background-color:rgba(255,0,0,0.08); color:rgba(150,0,0,0.5);'

			}else if( this.velocidad >= 20 && this.velocidad < 40 ){

				return 'background-color:rgba(255,150,0,0.08); color:rgba(255,150,0,0.5);'

			}else{

				return 'background-color:rgba(0,255,0,0.08); color:rgba(0,150,0,0.5);'

			}

		}

	}

}
</script>