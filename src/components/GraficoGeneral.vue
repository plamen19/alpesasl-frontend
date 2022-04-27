<template>
	
	<el-collapse-item title="Gráfico general">

		<LineChart :height="200" :chartData="datosGrafico" />

	</el-collapse-item>

</template>

<script>
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {

	name: 'GraficoGeneral',
	props: [ 'datosGrafico' ],
	components: { LineChart }

}
</script>