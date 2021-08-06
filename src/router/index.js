import Vue from 'vue'
import Router from 'vue-router'

import RegistroVisitantes from '@/components/RegistroVisitantes'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/visitantes/:id_detalle_visita?',
      name: 'RegistroVisitantes',
      component: RegistroVisitantes,
      props: (route) => ({ id_detalle_visita: route.query.is_detalle_visita })
    },
  ],
  mode: 'history'
})
