<template>
	
	<el-collapse-item style="padding-bottom:0;" title="Comentarios">

		<div v-if="!comentarios || comentarios.length == 0">

			<p class="text-muted">No hay comentarios.</p>

		</div>
		<div v-else>

			<p class="text-muted" v-for="(comm, index) in comentarios" :key="index">

				{{ comm.Comentario }}

			</p>

		</div>

	</el-collapse-item>

</template>

<script>
export default {
	
	name: 'Comentarios',

	props: [ "comentarios" ],

}
</script>