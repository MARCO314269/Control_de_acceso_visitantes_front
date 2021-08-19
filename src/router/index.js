import Vue from 'vue'
import Router from 'vue-router'

import RegistroVisitantes from '@/components/RegistroVisitantes'
import RegistroVisitantesMobile from '@/components/Mobile_Registro_visitantes'
import Test from '@/components/Test'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/visitantes/:id_detalle_visita?',
      name: 'RegistroVisitantes',
      component: RegistroVisitantes,
      props: (route) => ({ id_detalle_visita: route.query.is_detalle_visita })
    },
    {
      path: '/mobile/visitantes/:id_detalle_visita?',
      name: 'RegistroVisitantesMobile',
      component: RegistroVisitantesMobile,
      props: (route) => ({ id_detalle_visita: route.query.is_detalle_visita })
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ],
  mode: 'history'
})
