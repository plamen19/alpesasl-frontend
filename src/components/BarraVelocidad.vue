<template>
	
	<div>

		<p class="text-center"><b>Velocidad:</b> <span :class="velocidad > 1 ? (velocidad > 40 ? 'tag is-success' : 'tag is-warning has-text-dark') : 'tag is-danger'">{{ velocidad }}</span> </p>

		<span style="width:80%; height:30px;" class="progress mx-auto">
			<div class="progress-bar has-text-dark progress-bar-animated"
			
				:class="velocidad > 40 ? 'has-background-success' : 'has-background-warning'"
				role="progressbar" :aria-valuenow="velocidad" aria-valuemin="0" aria-valuemax="100" :style="'width:'+velocidad+'%;'"><b>{{ (velocidad.toFixed(2).replace(".",",")) + ".L" }}</b></div>
		</span>

	</div>

</template>

<script>
export default {
	
	name: 'BarraVelocidad',

	props: ['velocidad'],

}
</script>