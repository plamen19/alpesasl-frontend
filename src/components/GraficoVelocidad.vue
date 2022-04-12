<template>
	
	<div>

		<Chart ref="primeChart" type="line" :data="basicData" :options="basicOptions" />

	</div>

</template>

<script>
import Chart from 'primevue/chart'
import { ref } from 'vue';

export default {

	name: 'GraficoVelocidad',
	props: [ 'velocidad', 'tiempos' ],

	components: {

		Chart,

	},

	data(){

		return({

			basicData: {
				labels: [],
				datasets: [
					{
						label: 'Velocidad',
						data: [],
						fill: true,
						borderColor: '#42A5F5',
						tension: .4
					}
				]
			},
			basicOptions: {
				plugins: {
				legend: {
				labels: {
					color: '#495057'
				}
				}
				},
				scales: {
					x: {
					ticks: {
						color: '#495057'
					},
					grid: {
						color: '#ebedef'
					}
					},
					y: {
					ticks: {
						color: '#495057'
					},
					grid: {
						color: '#ebedef'
					}
					}
				}
			},

		})

	},

}
</script>