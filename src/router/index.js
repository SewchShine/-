import { createRouter, createWebHistory } from 'vue-router'

// 登录页
import Login from '../views/Login.vue'

// 管理员端
import AdminHelloPage from '../views/admin/AdminHelloPage.vue'
import AdminLayout from '../views/admin/AdminLayout.vue'
import AccountCreate from '../views/admin/AccountCreate.vue'
import AccountDelete from '../views/admin/AccountDelete.vue'
import AccountSearch from '../views/admin/AccountSearch.vue'
import ReviewSubmission from '../views/admin/ReviewSubmission.vue'

// 用户端
import UserHelloPage from '../views/user/UserHelloPage.vue'
import UserLayout from '../views/user/UserLayout.vue'
import HouseholdSearch from '../views/user/HouseholdSearch.vue'
import PopulationMoveIn from '../views/user/PopulationMoveIn.vue'
import PopulationMoveOut from '../views/user/PopulationMoveOut.vue'

import BirthReport from '../views/user/BirthReport.vue'
import DeathCancellation from '../views/user/DeathCancellation.vue'

import IdUnder16 from '../views/user/IdUnder16.vue'
import IdApply from '../views/user/IdApply.vue'
import IdReportLoss from '../views/user/IdReportLoss.vue'
const routes = [
  // 登录页
  {
    path: '/',
    name: 'Login',
    component: Login
  },

  // 管理员端（带子路由 + 左侧菜单）
  {
    path: '/admin',
    name: 'AdminLayout',
    component: AdminLayout,
    children: [
      { path: '', name: 'AdminHelloPage', component: AdminHelloPage }, // 默认跳转创建账号
      { path: 'create', name: 'AccountCreate', component: AccountCreate },
      { path: 'delete', name: 'AccountDelete', component: AccountDelete },
      { path: 'search', name: 'AccountSearch', component: AccountSearch },
      { path: 'review', name: 'ReviewSubmission', component: ReviewSubmission }
    ]
  },

  // 用户端（后续可以添加子路由）
  {
    path: '/user',
    name: 'UserLayout',
    component: UserLayout,
    children: [
      { path: '', name: 'UserHelloPage', component: UserHelloPage },

    // 户籍管理
    { path: 'household/search', component: HouseholdSearch },

    // 常驻人口管理
    { path: 'population/in', component: PopulationMoveIn },
    { path: 'population/out', component: PopulationMoveOut },
    { path: 'population/death', component: DeathCancellation },
    { path: 'population/birth-report', component: BirthReport },


    // 证件管理
    { path: 'id/under16', component: IdUnder16 },
    { path: 'id/apply', component: IdApply },
    { path: 'id/loss', component: IdReportLoss },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
