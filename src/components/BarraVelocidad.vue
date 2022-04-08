<template>
	
	<div>

		<!-- <p class="text-center"><b>Velocidad:</b> <span :class="velocidad > 1 ? (velocidad > 40 ? 'tag is-success' : 'tag is-warning has-text-dark') : 'tag is-danger'">{{ velocidad }}</span> | <b>(%) Merma:</b> <span class="tag is-danger">{{ merma.toFixed(0) }}%</span></p> -->

		<div v-if="cargando">
			<vs-progress class="barra-velocidad" :height="10" indeterminate color="primary">primary</vs-progress>
		</div>
		<div v-else>
			<div class="barra-velocidad">

				<h4 class="text-muted">Velocidad</h4>
				<el-progress stroke-width="12" width="160" type="dashboard" :percentage="velocidad.toFixed(2)" :color="colors" />

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
				{ color: '#1989fa', percentage: 80 },
				{ color: '#6f7ad3', percentage: 100 },
			]

		})

	}

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