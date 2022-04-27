<template>
	
	<div v-if="cliente && descripcion" class="mb-2">

		<h5><b class="tag is-info is-light">Cliente:</b> {{ cliente }}</h5>
		<h5><b class="tag is-info is-light">Producto:</b> {{ descripcion }} {{ descripcionCliente ? (" | " + descripcionCliente ): '' }}</h5>

	</div>

</template>

<script>
export default {
	
	name: 'InfoCliente',

	props: [ 'cliente', 'descripcion', 'descripcionCliente' ],

}
</script>

<style scoped>

	h5{

		font-size: 1em;

	}

</style>