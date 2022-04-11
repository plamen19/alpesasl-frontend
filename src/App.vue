<template>
       <div class="container-fluid">
              <div class="row flex-nowrap">
			<div class="col-1">
              		<sidebar-menu collapsed="true" width="220px" :menu="menu" />
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
export default {
       name: "App",

       data() {
              return {
                     ubicacion: 0,

                     menu: [
							
                            {
                                   href: "/",
                                   title: "Inicio",
                                   icon: "bi bi-house-fill",
                            },

                            {
                                   href: "/maquinas",
                                   title: "Maquinas",
                                   icon: "bi bi-pc-display",
                            },	
                            {
                                   href: "/operarios",
                                   title: "Operarios",
                                   icon: "bi bi-people-fill",
                            },
                            {
                                   href: "/operaciones",
                                   title: "Operaciones",
                                   icon: "bi bi-journals",
                            },	
                            {
                                   href: "/boletines",
                                   title: "Boletines",
                                   icon: "bi bi-journal",
                            },	

                     ],
              };
       },

       methods: {
              cambiarUbicacion: function (ubi) {
                     this.ubicacion = ubi;
              },
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