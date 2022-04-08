<template>
	
	<div>

		<!-- <p class="text-center"><b>Velocidad:</b> <span :class="velocidad > 1 ? (velocidad > 40 ? 'tag is-success' : 'tag is-warning has-text-dark') : 'tag is-danger'">{{ velocidad }}</span> | <b>(%) Merma:</b> <span class="tag is-danger">{{ merma.toFixed(0) }}%</span></p> -->

		<div v-if="cargando">
			<vs-progress class="barra-velocidad" :height="30" indeterminate color="primary">primary</vs-progress>
		</div>
		<div v-else>
			<vs-progress class="barra-velocidad" :height="30" :percent="velocidad" :color="(velocidad >= 40 ? 'success' : (velocidad > 0 ? 'warning' : 'danger'))"></vs-progress>
		</div>

	</div>

</template>

<script>
export default {
	
	name: 'BarraVelocidad',

	props: ['cargando', 'velocidad', 'merma'],

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