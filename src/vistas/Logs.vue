<template>
	
	<div>

		<img style="width:30%; display:block; margin:0 auto;" src="../assets/logs.svg" alt="">

		<br>

		<h3>Logs</h3>
		<p>Consulta todos los logs generados por la aplicación.</p>

		<div class="card-deck">

			<div class="row row-flex">

				<TarjetaLog titulo="SPIN" icono="bi bi-hdd" desc="Logs generados por la API Rest de Spin." tipoLog="spin" />
				<TarjetaLog titulo="BBDD" icono="bi bi-bar-chart-steps" desc="Logs generados por la API Rest que consulta a SQLServer." tipoLog="sql" />
				<TarjetaLog titulo="Modbus" icono="bi bi-pci-card" desc="Logs generados por la API Rest que obtiene Modbus." tipoLog="modbus" />

			</div>

		</div>

	</div>

</template>

<script>
import TarjetaLog from '../components/TarjetaLog.vue';

export default {
       components: { TarjetaLog },
	
	name: 'Logs',

}
</script>

<style scoped>

	a { text-decoration: none; }

</style>