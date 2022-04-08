<template>
	
	<div>

		<div class="row">

			<div class="col-12 col-md-6 text-center">

				<p class="tag is-light is-secondary"><b>Tiemp.:</b> <span>{{ getTiempoFormateado( tiempos[1] ) }}</span></p>
				<br>
				<p class="tag is-light is-success"><b>TPrep.:</b> <span>{{ getTiempoFormateado( tiempos[2] ) }}</span></p>

			</div>

			<div class="col-12 col-md-6 text-center">

				<p class="tag is-light is-secondary"><b>TMarcha:</b> <span>{{ getTiempoFormateado( tiempos[3] ) }}</span></p>
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

	ul>li>p>span{

		margin-left: 5px;

	}

</style>