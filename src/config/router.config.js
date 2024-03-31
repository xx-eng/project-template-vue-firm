// eslint-disable-next-line
import { BasicLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'
import RouteView from '@/layouts/RouteView'
import BlankLayout from '@/layouts/BlankLayout'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/analysis',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis',
        component: RouteView,
        meta: { title: '主页', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '首页', keepAlive: false, permission: ['dashboard'] }
          }
        ]
      },
      // goods
      {
        path: '/goods',
        name: 'Goods',
        component: RouteView,
        redirect: '/goods/audit',
        meta: { title: '商品管理', icon: 'shop' },
        children: [
          {
            path: 'audit',
            name: 'AuditGoods',
            component: () => import('@/views/goods/audit'),
            meta: { title: '待审核商品' }
          },
          {
            path: 'failed',
            name: 'FailedGoods',
            component: () => import('@/views/goods/failed'),
            meta: { title: '审核未通过' }
          },
          {
            path: 'manage-goods',
            name: 'ManageGoods',
            component: () => import('@/views/goods/manage'),
            meta: { title: '上下架管理' }
          },
          {
            path: '/add',
            name: 'AddGoods',
            component: () => import('@/views/goods/add'),
            meta: { title: '添加商品' }
          }
        ]
      },
      // order
      {
        path: '/order',
        name: 'Order',
        component: RouteView,
        redirect: '/order/manage',
        meta: { title: '交易管理', icon: 'ordered-list' },
        children: [
          {
            path: 'manage',
            name: 'ManageOrder',
            component: () => import('@/views/order/manage'),
            meta: { title: '订单管理' }
          },
          {
            path: 'trade',
            name: 'Trade',
            component: () => import('@/views/order/trade'),
            meta: { title: '交易金额' }
          },
          {
            path: 'consignment',
            name: 'Consignment',
            component: () => import('@/views/order/consignment'),
            meta: { title: '发货处理' }
          },
          {
            path: 'refund',
            name: 'Refund',
            component: () => import('@/views/order/refund'),
            meta: { title: '退款处理' }
          },
          {
            path: 'terminal',
            name: 'Terminal',
            component: () => import('@/views/order/terminal'),
            meta: { title: '退租处理' }
          },
          {
            path: 'continue',
            name: 'Continue',
            component: () => import('@/views/order/continue'),
            meta: { title: '续租管理' }
          }
        ]
      },
      {
        path: '/brand',
        name: 'Brand',
        component: RouteView,
        redirect: '/brand/manage',
        meta: { title: '品牌', icon: 'ordered-list' },
        children: [
          {
            path: 'manage',
            name: 'ManageBrand',
            component: () => import('@/views/brand/manage'),
            meta: { title: '品牌管理' }
          },
          {
            path: 'add',
            name: 'AddBrand',
            component: () => import('@/views/brand/add'),
            meta: { title: '添加品牌' }
          }
        ]
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '账号中心', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: '个人信息', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '账号管理', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/basic',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/basic',
                name: 'BasicSettings',
                component: () => import('@/views/account/settings/BasicSetting'),
                meta: { title: '基本资料', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {
                  title: '更改密码',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              }
              /* ,
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: 'account.settings.menuMap.custom', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: 'account.settings.menuMap.binding', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: {
                  title: 'account.settings.menuMap.notification',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              } */
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: BlankLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/user/Login2')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/user/Register')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      }
    ]
  },
  {
    path: '/template',
    component: RouteView,
    hidden: true,
    children: [
      {
        path: 'login1',
        name: 'Login1',
        component: () => import('@/views/user/Login1')
      },
      {
        path: 'login2',
        name: 'Login2',
        component: () => import('@/views/user/Login2')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
