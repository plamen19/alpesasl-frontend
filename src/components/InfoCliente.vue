<template>
	
	<div>

		<h5><b class="tag is-info is-light">Cliente:</b> {{ cliente }}</h5>
		<h5><b class="tag is-info is-light">Desc.:</b> {{ descripcion }}</h5>

	</div>

</template>

<script>
export default {
	
	name: 'InfoCliente',

	props: [ 'cliente', 'descripcion' ],

}
</script>

<style scoped>

	h5{

		font-size: 0.8em;

	}

</style>