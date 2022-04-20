<template>
	
	<div>

              <sidebar-menu :collapsed="true" width="220px" :menu="menu" />

	</div>

</template>

<script>
export default {
	
	name: 'Menu',

	data(){

		return({

                     menu: [

				{
					header: 'Alpesa SL - Gestión',
					hidden: false,
					hiddenOnCollapse: true,
				},
				
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
                            {
                                   href: "/logs",
                                   title: "Logs",
                                   icon: "bi bi-body-text",
                            },

                     ],

		});

	}

}
</script>