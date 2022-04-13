<template>
	
	<div>

		<div class="row">

			<div class="col-12 col-md-6 text-center">

				<p class="tag is-light is-secondary"><b>Tiemp.:</b> <span>{{ getTiempoFormateado( tiempos[1] ) }} | <b>Conc.:</b> {{ getTiempoFormateado( tiempos[5] + tiempos[6] ) }}</span></p>
				<br>
				<p class="tag is-light is-success"><b>TMarcha.:</b> <span>{{ getTiempoFormateado( tiempos[3] ) }} | <b>Conc.:</b> {{ getTiempoFormateado( tiempos[5] ) }}</span></p>

			</div>

			<div class="col-12 col-md-6 text-center">

				<p class="tag is-light is-secondary"><b>TPrep:</b> <span>{{ getTiempoFormateado( tiempos[2] ) }} | <b>Conc.:</b> {{  getTiempoFormateado( tiempos[6] ) }}</span></p>
				<br>
				<p class="tag is-light is-danger"><b>TParada:</b> <span>{{ getTiempoFormateado( tiempos[4] ) }}</span></p>

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