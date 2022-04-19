<template>
	
	<div v-if="Math.ceil(velocidad) < velocidadBoletin">

		<el-alert :closable="false"
			type="warning">
			<marquee-text :duration="2" :repeat="10">

				&nbsp; Velocidad insuficiente: <b>{{ Math.ceil(velocidad) }} de {{ velocidadBoletin }}</b> &nbsp;

			</marquee-text>
		</el-alert>

	</div>
	
</template>

<script>
import MarqueeText from 'vue-marquee-text-component';

export default {
	
	name: 'MarqueeVelocidad',
	props: [ 'velocidad', 'velocidadBoletin' ],
	components: {

		MarqueeText,

	}

}
</script>