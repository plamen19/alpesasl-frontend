<template>
	
	<div>

		<!-- <p class="text-center"><b>Velocidad:</b> <span :class="velocidad > 1 ? (velocidad > 40 ? 'tag is-success' : 'tag is-warning has-text-dark') : 'tag is-danger'">{{ velocidad }}</span> | <b>(%) Merma:</b> <span class="tag is-danger">{{ merma.toFixed(0) }}%</span></p> -->

		<div v-if="cargando">
			<vs-progress class="barra-velocidad" :height="10" indeterminate color="primary">primary</vs-progress>
		</div>
		<div v-else>

			<div class="row">

				<div class="col-12 col-md-6">
					
					<h6 class="f-4 text-muted text-center">Velocidad</h6>
					<div class="barra-velocidad">

						<el-progress :stroke-width="12" :width="160" type="dashboard" :percentage="(+velocidad.toFixed(2))" :color="colors">

							<span :style="getColorTexto()" class="percentage-value">{{ velocidad.toFixed(2) }}</span>

						</el-progress>

					</div>

				</div>

				<div class="col-12 col-md-6">

					<h6 class="f-4 text-muted text-center">% Merma</h6>
					<div class="barra-velocidad">

						<el-progress v-if="merma" :stroke-width="12" :width="160" type="dashboard" :percentage="((+merma > 0 ? +merma : 0))" color="#f56c6c">

							<span class="percentage-value text-danger">{{ Math.ceil( merma ) }}%</span>

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

	props: ['cargando', 'velocidad', 'merma'],

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

		}

	},

}
</script>

<style scoped>

	.barra-velocidad{

		width:40%;
		margin:0 auto;
		text-align:center;
		display: block;

	}

</style>