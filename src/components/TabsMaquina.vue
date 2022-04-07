<template>
       <div>
              <ul class="nav nav-tabs">
                     <li class="nav-item">
                            <a
                                   class="nav-link active"
                                   aria-current="page"
                                   href="#"
                                   >Máquina</a
                            >
                     </li>
                     <li class="nav-item">
                            <a class="nav-link" href="#">Equipo</a>
                     </li>
                     <li class="nav-item">
                            <a class="nav-link" href="#">Boletín</a>
                     </li>
                     <li class="nav-item">
                            <a class="nav-link" href="#">Preparación</a>
                     </li>
                     <li class="nav-item">
                            <a class="nav-link" href="#">Intervención</a>
                     </li>						
              </ul>
       </div>
</template>

<script>
export default {
       name: "TabsMaquina",
};
</script>

<style scoped>

	.nav-item{

		padding: 10px;

	}

	ul{
		border-bottom: none;
	}

</style>