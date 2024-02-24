import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path:'/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/common',
      name: 'common',
      component: ()=>import('../views/NormalUser/NormalUserIndex.vue')
    },
    {
      path: '/manager',
      name: 'manager',
      component: () => import('../views/MangermentView/MangermentIndex.vue')
    }
  ]
})
// router.beforeEach(async (to,from,next)=>{
//   var auth =localStorage.getItem('token');
//   if(to.path=="/home" ){
//     if(auth){
//       router.push("/common")
//     }else{
//       next()
//     }
//   }else{
//     if(auth){
//       next();
//     }else{
//       router.push("/home")
//     }
//   }
// })

export default router
