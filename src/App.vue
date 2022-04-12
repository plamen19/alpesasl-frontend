<template>
       <div class="container-fluid">
              <div class="row flex-nowrap">
			<div class="col-1">
              		<Menu/>
			</div>
                     <div class="col py-3">
                            <div class="container">
                                   <br />
                                   <router-view />
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

       data() {
              return {

                     ubicacion: 0,

              };
       },

};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);

a {
       text-decoration: none;
}

.menu {
       background-color: rgba(0, 0, 0, 0.75);

       font-family: "Open Sans", serif;

       font-size: 0.9em;
}

.menu a {
       color: rgba(255, 255, 255);
       font-size: 0.85em;
       margin-bottom: 10px;
}

.menu a:hover {
       color: white;
}
</style>