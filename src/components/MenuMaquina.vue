<template>
	
	<div>

		<vs-divider></vs-divider>

		<vs-card>

			<vs-button color="primary" type="filled" to="/components/list.html">Máquina</vs-button>
			<br><br>
			<vs-button color="primary" type="border" to="/components/list.html">Equipo</vs-button>
			<br><br>
			<vs-button color="primary" type="border" to="/components/list.html">Boletín</vs-button>

		</vs-card>

		<vs-divider></vs-divider>

		<vs-card>

			<vs-button color="warning" type="filled" to="/components/list.html">Preparación</vs-button>
			<br><br>
			<vs-button color="danger" type="filled" to="/components/list.html">Intervención</vs-button>

		</vs-card>		

	</div>

</template>

<script>
export default {

	name: 'MenuMaquina',

}
</script>

<style scoped>

	.vs-button{

		width:100%;

	}

</style>