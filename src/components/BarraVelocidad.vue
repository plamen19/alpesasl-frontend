<template>
	
	<div>

		<p class="text-center"><b>Velocidad:</b> <span :class="velocidad > 1 ? (velocidad > 40 ? 'tag is-success' : 'tag is-warning has-text-dark') : 'tag is-danger'">{{ velocidad }}</span> | <b>(%) Merma:</b> <span class="tag is-danger">{{ merma.toFixed(0) }}%</span></p>

		<span style="width:80%; height:50px;box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;" class="progress mx-auto">
			<div class="progress-bar has-text-dark progress-bar-animated"
			
				:class="velocidad > 40 ? 'has-background-success text-light' : 'has-background-warning text-dark'"
				role="progressbar" :aria-valuenow="velocidad" aria-valuemin="0" aria-valuemax="100" :style="'width:'+velocidad+'%;'"><b>{{ (velocidad.toFixed(2).replace(".",",")) + ".L" }}</b></div>
		</span>

	</div>

</template>

<script>
export default {
	
	name: 'BarraVelocidad',

	props: ['velocidad', 'merma'],

}
</script>