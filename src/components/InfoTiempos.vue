<template>
	
	<div>

		<div class="row">

			<div class="col-12 col-md-6 text-center">

				<p><span class="tag is-light is-secondary"><b>Tiemp.:</b> <span class="ml-1">{{ getTiempoFormateado( tiempos[1] ) }}</span></span> <span class="tag is-light is-link"><b>Conc.:</b> <span class="ml-1">{{ getTiempoFormateado( tiempos[5] + tiempos[6] )}}</span></span></p>
				<p><span class="tag is-light is-success"><b>TMarcha.:</b> <span class="ml-1">{{ getTiempoFormateado( tiempos[3] ) }}</span></span> <span class="tag is-light is-link"><b>Conc.:</b> <span class="ml-1">{{ getTiempoFormateado( tiempos[5] ) }}</span></span></p>

			</div>

			<div class="col-12 col-md-6 text-center">

				<p><span class="tag is-light is-secondary"><b>TPrep:</b> <span class="ml-1">{{ getTiempoFormateado( tiempos[2] ) }}</span></span><span class="tag is-light is-link"><b>Conc.:</b> <span class="ml-1">{{  getTiempoFormateado( tiempos[6] ) }}</span></span></p>
				<p class="tag is-light is-danger"><b>TParada:</b> <span class="ml-1">{{ getTiempoFormateado( tiempos[4] ) }}</span></p>

			</div>

		</div>

	</div>

</template>

<script>
export default {
	
	name: 'InfoTiempos',

	props: ['tiempos'],

	methods: {

		getTiempoFormateado: function( tiempo ){

			let horas = Math.floor((tiempo/3600));
			let minutos = Math.floor((tiempo/60)%60);
			let secs = Math.floor(tiempo%60);

			return (horas < 10 ? "0" + horas : horas) + ":" + (minutos < 10 ? "0" + minutos : minutos) + ":" + (secs < 10 ? "0" + secs : secs);

		},

	}

}
</script>

<style scoped>

	p>span{

		margin-left: 5px;

	}

</style>