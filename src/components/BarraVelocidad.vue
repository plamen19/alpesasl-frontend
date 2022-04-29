<template>
	
	<div>

		<!-- <p class="text-center"><b>Velocidad:</b> <span :class="velocidad > 1 ? (velocidad > 40 ? 'tag is-success' : 'tag is-warning has-text-dark') : 'tag is-danger'">{{ velocidad }}</span> | <b>(%) Merma:</b> <span class="tag is-danger">{{ merma.toFixed(0) }}%</span></p> -->

		<div v-if="cargando">
			<vs-progress class="barra-velocidad" :class="'w-50'" :height="10" indeterminate color="primary"></vs-progress>
		</div>
		<div v-else>

			<div class="row">

				<div class="col-12 col-md-6">

					<h6 class="f-4 text-muted text-center">Velocidad</h6>
					<div class="barra-velocidad">

						<el-progress @click="cambiarIndicador" :stroke-width="5" :width="120" type="dashboard" :percentage="(isFinite((+velocidad.toFixed(2))) ? (+velocidad.toFixed(2)) : 0)" :color="getColorMaquina()">
							
							<span v-if="indicadorVelocidad" class="percentage-value">{{ (estado == "PARO" ? "PARO" : (isFinite((+velocidad.toFixed(2))) ? ((+velocidad.toFixed(2)) + (indicadorVelocidad == 1 ? '.L' : '.c') ) : 0)) }}</span>

						</el-progress>

					</div>

				</div>

				<div class="col-12 col-md-6">

					<h6 class="f-4 text-muted text-center">% Merma</h6>
					<div class="barra-velocidad">

						<el-progress :stroke-width="5" :width="120" type="dashboard" :percentage="((merma && +merma > 0 ? +merma : 0))" color="#f56c6c">

							<span class="percentage-value text-danger">{{ merma ? Math.ceil( merma ) : 0 }}%</span>

						</el-progress>

					</div>

				</div>				

			</div>

		</div>

	</div>

</template>

<script>
export default {
	
	name: 'BarraVelocidad',

	props: ['cargando', 'velocidad', 'estado', 'merma', 'indicadorVelocidad', 'esMandriladora'],

	data(){

		return({

		})

	},

	methods: {

		getColorMaquina: function(){


			if( this.estado == "PREPARACION" ){

				return "#FFCOCO"

			}else if( this.estado == "MARCHA" ){

				return "#60b40f";

			}else if( this.estado == "PARO" ){

				return "#cc0f35"

			}else if( this.estado == "E.TUBO" ){

				return "#e4e402"

			}else if( this.estado == "E.CAJA" ){

				return "#60080f"

			}else{

				return "#0f0f0f"

			}

		},

		cambiarIndicador: function(){

			if( this.esMandriladora ){
				this.$emit( 'cambiarTipoVelocidad' );
			}

		}

	},

}
</script>

<style scoped>

	.barra-velocidad{

		width:100%;
		margin:0 auto;
		text-align:center;
		display: block;

	}

</style>