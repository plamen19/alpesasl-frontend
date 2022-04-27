<template>
	
	<div class="col-12 col-md-6">

		<h4>Turnos</h4>

		<table>

			<thead>
				<th>Cód.</th>
				<th>Turno</th>
			</thead>

			<tbody>

				<tr>
					<td>T-1</td>
					<td>T-1 Mañana</td>
				</tr>

				<tr>
					<td>T-2</td>
					<td>T-2 Tarde</td>
				</tr>

				<tr>
					<td>T-3</td>
					<td>T-3 Noche</td>
				</tr>						

			</tbody>

		</table>

	</div>

</template>

<script>
export default {
	
	name: 'ColumnaTurnos',

}
</script>

<style scoped>

	th, td{

		padding:10px;
		font-size:0.8em;

	}

</style>