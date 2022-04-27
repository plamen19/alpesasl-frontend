<template>
	
	<div>

		<h3>Áreas</h3>
		<p>Áreas creadas en el sistema.</p>

		<TablaAreas/>

	</div>

</template>

<script>
import TablaAreas from '../components/TablaAreas.vue'

export default {
       components: { TablaAreas },
	
	name: 'Areas',

}
</script>