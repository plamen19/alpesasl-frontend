<template>
	
	<div>

		<img style="width:30%; display:block; margin:0 auto;" src="../assets/plantas.svg" alt="">

		<br>

		<h3>Plantas</h3>
		<p>Plantas pertenecientes a la empresa. Consulta el estado de todas las máquinas de una planta en tiempo real.</p>

		<div class="row justify-content-center">

			<TarjetaPlanta nombre="Tavernes" />
			<TarjetaPlanta nombre="Tavernes Corte" />
			<TarjetaPlanta nombre="Barcelona" />
			<TarjetaPlanta nombre="Pte. Genil" />
			<TarjetaPlanta nombre="UPalet" />

		</div>


	</div>

</template>

<script>
import TarjetaPlanta from '../components/TarjetaPlanta.vue'

export default {
       components: { TarjetaPlanta },
	
	name: 'Plantas',

}
</script>