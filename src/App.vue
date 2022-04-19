<template>
       <div class="container-fluid">
              <div class="row flex-nowrap">
			<div class="col-1">
              		<Menu/>
			</div>
                     <div class="col py-3">
                            <div class="container">
                                   <br />
                                   <router-view class="ml-4 ml-sm-0" />
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