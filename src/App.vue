<template>
       <div class="container-fluid">
              <div class="row flex-nowrap">
			<div class="col-1">
              		<Menu/>
			</div>
                     <div class="col ml-2 ml-md-0">
                            <div class="container">
                                   <br />
                                   <router-view/>
                            </div>
                     </div>
              </div>
       </div>
</template>

<script>
import Menu from './components/Menu.vue';

export default {
       components: { Menu },
       name: "App",
};
</script>