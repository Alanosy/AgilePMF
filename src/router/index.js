/*
 * @Author: 暮安 14122148+muanananan@user.noreply.gitee.com
 * @Date: 2024-04-15 08:52:51
 * @FilePath: \vue-admin-template\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  {
    path: '/teamChoice',
    component: () => import('@/views/login/teamChoice'),
    hidden: true
  },
{
  path: '/hint',
  component: () => import('@/views/login/hint'),
  hidden: true
},
  // teamChoicehint

  {
    path: '/',
    component: Layout,
    meta: { requireAuth: true },
    children: [{
      path: '/index',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘', icon: 'el-icon-data-analysis', visible: true }

    },
    
  ]
},
{
    path: '/team',
    component: Layout,
    meta: { requireAuth: true },
    children: [{
      path: '/team',
      name: 'team',
      component: () => import('@/views/team/index'),
    },
    
  ]
},
{
  path: '/account',
  component: Layout,
  meta: { requireAuth: true },
  children: [{
    path: '/account',
    name: 'account',
    component: () => import('@/views/account/index'),
  },
  
]
},

  {
    path: '/team',
    name: 'team',
    component: () => import('@/views/team/index'),
  },

  {
    path: '/project',
    component: Layout,
    children: [{
      path: '/project',
      name: 'project',
      component: () => import('@/views/project/index.vue'),
      meta: { title: '项目管理', icon: 'el-icon-suitcase', visible: true, roles: ['teacher', 'admin'] }
    }]
  },
  {
    path: '/item',
    component: Layout,
    children: [{
      path: '/item',
      name: 'item',
      component: () => import('@/views/project/item.vue'),
    }]
  },
  {
    path: '/itemsave',
    component: Layout,
    children: [{
      path: '/itemsave',
      name: 'itemsave',
      component: () => import('@/views/project/save.vue'),
    }]
  },
  {
    path: '/requirement',
    component: Layout,
    children: [{
      path: '/requirement',
      name: 'requirement',
      component: () => import('@/views/requirement/index.vue'),
      meta: { title: '需求中心', visible: true, roles: ['teacher', 'admin'], icon: 'el-icon-takeaway-box' }
    }]
  },
  {
    path: '/issue',
    component: Layout,
    children: [{
      path: '/issue',
      name: 'issue',
      component: () => import('@/views/issue/index.vue'),
      meta: { title: '问题中心', visible: true, roles: ['admin', 'student'], icon: 'el-icon-document' }
    }]
  },
  {
    path: '/task',
    component: Layout,
    children: [{
      path: '/task',
      name: 'task',
      component: () => import('@/views/task/index.vue'),
      meta: { title: '任务中心', visible: true, roles: ['admin', 'student'], icon: 'el-icon-copy-document' }
    }]
  },
  {
    path: '/workbench',
    component: Layout,
    children: [{
      path: '/workbench',
      name: 'workbench',
      component: () => import('@/views/workbench/index.vue'),
      meta: { title: '工作台', visible: true, roles: ['admin', 'student'], icon: 'el-icon-document-copy' },
    }
  ]
  },

  // /my-tasks
  // {
  //   path: '/myself',
  //   component: Layout,
  //   children: [{
  //     path: '/myself',
  //     name: 'myself',
  //     hidden: true,
  //     component: () => import('@/views/user/myself'),
  //     meta: { title: '个人中心', visible: true, roles: ['teacher', 'admin', 'student'], icon: 'dashboard' }
  //   }]
  // },
  // {
  //   path: '/changemima',
  //   component: Layout,
  //   children: [{
  //     path: '/changemima',
  //     name: 'changemima',
  //     hidden: true,
  //     component: () => import('@/views/user/updatePassword.vue'),
  //     meta: { title: '修改密码', visible: true, roles: ['teacher', 'admin', 'student'], icon: 'dashboard' }
  //   }]
  // },
  
  

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
