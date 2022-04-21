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

						<el-progress @click="cambiarIndicador" :stroke-width="12" :width="160" type="dashboard" :percentage="(isFinite((+velocidad.toFixed(2))) ? (+velocidad.toFixed(2)) : 0)" :color="colors">
							
							<span v-if="indicadorVelocidad" :style="getColorTexto()" class="percentage-value">{{ (isFinite((+velocidad.toFixed(2))) ? ((+velocidad.toFixed(2)) + (indicadorVelocidad == 1 ? '.L' : '.c') ) : 0) }}</span>

						</el-progress>

					</div>

				</div>

				<div class="col-12 col-md-6">

					<h6 class="f-4 text-muted text-center">% Merma</h6>
					<div class="barra-velocidad">

						<el-progress :stroke-width="12" :width="160" type="dashboard" :percentage="((merma && +merma > 0 ? +merma : 0))" color="#f56c6c">

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

	props: ['cargando', 'velocidad', 'merma', 'indicadorVelocidad', 'esMandriladora'],

	data(){

		return({

			colors: [
				{ color: '#f56c6c', percentage: 20 },
				{ color: '#e6a23c', percentage: 40 },
				{ color: '#5cb87a', percentage: 60 },
				{ color: '#5cb87a', percentage: 70 },
				{ color: '#5cb87a', percentage: 80 },
				{ color: '#5cb87a', percentage: 100 },
			]

		})

	},

	methods: {

		getColorTexto: function(){

			if( this.velocidad >= 0 && this.velocidad <= 20 ){

				return 'color:rgba(255, 0, 0, 0.5);';

			}else if( this.velocidad > 20 && this.velocidad < 40 ){

				return 'color:rgba(255, 150, 0, 0.5);';

			}else if( this.velocidad >= 40 ){

				return 'color:rgba(0, 150, 0, 0.5);';

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