import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import store from '../store'
import Home from '@/components/Home'
import Information from '@/components/Information'
import News from '@/components/News'
import Conference from '@/components/Conference'
import allConference from '@/components/allConference'
import applyConference from '@/components/applyConference'
import Admin from '@/components/admin'
import search from '@/components/search'
import results from '@/components/results'
import handInWriting from '@/components/handInWriting'
import logout from '@/components/logout'
import choserole from '@/components/choserole'
import conferenceDetail from '@/components/conferenceDetail'
import searchCon from '@/components/searchCon'
import secondResults from '@/components/secondResults'
import chosetopic from '@/components/chosetopic'
import myWriting from '@/components/myWriting'
import submitReview from '@/components/submitReview'
import assessmentResults from '@/components/assessmentResults'
import assessmentDetail from '@/components/assessmentDetail'
import checkPaper from '@/components/checkPaper'
import talking from '@/components/talking'

Vue.use(Router)

export const router = new Router({
  linkActiveClass:'is-active',
  mode:'history',//改为history模式
  routes: [
    {
      path: '/',
      redirect:'/login',
      meta:{
        keepalive:true,
        keepinitial:true,
      }
    },


    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{
        keepalive:true,
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta:{
        keepalive:true,
      }
    },
    {
      path: '/home',
      name: 'Home',
      component:Home,
      meta:{
        keepalive:true,
        keepaside:true,
        keepinitial:true,//container侧边栏布局，初始页面隐藏
      }
    },
    {
      path: '/allConference',
      name: 'allConference',
      component: allConference,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component:logout,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },
    {
      path: '/applyConference',
      name: 'applyConference',
      component: applyConference,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },
    {
      path: '/conference',
      name: 'Conference',
      component: Conference,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },
    {
      path: '/news',
      name: 'News',
      component: News,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },
    {
      path: '/information',
      name: 'Information',
      component: Information,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta:{
        keepadAside:true,
        requireAuth: true,
        keepadmin:true,
        keepinitial:true,
      }
    },
    {
      path: '/handInWriting',
      name: 'handInWriting',
      component: handInWriting,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },

    {
      path: '/results',
      name: 'results',
      component: results,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },
    {
      path: '/choserole',
      name: 'choserole',
      component: choserole,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },
    {
      path: '/conferenceDetail',
      name: 'conferenceDetail',
      component: conferenceDetail,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },
    {
      path: '/searchCon',
      name: 'searchCon',
      component: searchCon,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepadmin:false,
        keepaside:true,
        keepinitial:true,
      }
    },
    {
      path: '/secondResults',
      name: 'secondResults',
      component: secondResults,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },
    {
      path: '/chosetopic',
      name: 'chosetopic',
      component: chosetopic,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },

    {
      path: '/myWriting',
      name: 'myWriting',
      component: myWriting,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },

    {
      path: '/checkPaper',
      name: 'checkPaper',
      component: checkPaper,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },

    {
      path: '/submitReview',
      name: 'submitReview',
      component: submitReview,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },
    {
      path: '/assessmentResults',
      name: 'assessmentResults',
      component: assessmentResults,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },
    {
      path: '/assessmentDetail',
      name: 'assessmentDetail',
      component: assessmentDetail,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },
    {
      path: '/talking',
      name: 'talking',
      component: talking,
      meta:{
        requireAuth: true,
        keepalive:true,
        keepaside:true,
        keepinitial:true,
      }
    },

  ]
})

//前端登录拦截
router.beforeEach(function (to, from ,next) {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 登录成功之后重新跳转到该路由
      })
    }
  } else {
    next()
  }
})
