<template>
	
	<div v-if="cliente && descripcion" class="mb-4 mt-4">

		<h5><b class="tag is-link is-light mr-1"><i class="bi bi-file-earmark-person-fill"></i></b> {{ cliente }}</h5>
		<h5><b class="tag is-link is-light mr-1"><i class="bi bi-box2-fill"></i></b> {{ descripcion }} {{ descripcionCliente ? (" | " + descripcionCliente ): '' }}</h5>

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