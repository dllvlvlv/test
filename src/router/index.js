import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import First from '@/components/First'
import Hi from '@/components/Hi'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/components/First',
      name: 'First',
      component: First
    },
    {
      path: '/components/Hi',
      name: 'Hi',
      component: Hi
    },
    {
      path: '/components/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/components/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
    // {
    //   path: '../../config/include-openlayers',
    //   name: 'OpenLayer',
    //   component: OpenLayer
    // }
  ]
})
