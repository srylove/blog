import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/layout/Layout'

import NewMain from '@/pages/new/Main'
import SocialMain from '@/pages/social/Main'
import SocialDetails from '@/pages/social/Details'
import BlogMain from '@/pages/blog/Main'
import BlogAdd from '@/pages/blog/Add'
import BlogEdit from '@/pages/blog/Edit'
import BlogDetails from '@/pages/blog/Details'
import ProjectMain from '@/pages/project/Main'
import ProjectDetails from '@/pages/project/Details'
import ConfigureMain from '@/pages/configure/Main'




Vue.use(Router)

export const constantRouterMap = [

    {
        path: '/user/new',
        redirect: '/user/new/main',
        component: Layout,
        meta: {
            type: "user",
            icon: 'el-icon-star-off',
            title: '最新动态'
        },
        children: [
            {
                path: 'main',
                component: NewMain,
                meta: { title: '最新动态' }
            }
        ]
    },
    {
        path: '/user/social',
        redirect: '/user/social/main',
        component: Layout,
        meta: {
            type: "user",
            icon: 'el-icon-mobile-phone',
            title: '社交圈'
        },
        children: [
            {
                path: 'main',
                component: SocialMain,
                meta: { title: '社交圈' }
            },
            {
                path: 'details/:name',
                component: SocialDetails,
                meta: { title: '用户资料' }
            }
        ]
    },
    {
        path: '/user/blog',
        redirect: '/user/blog/main',
        component: Layout,
        meta: {
            type: "user",
            icon: 'el-icon-edit-outline',
            title: '博客列表'
        },
        children: [
            {
                path: 'main',
                component: BlogMain,
                meta: { title: '博客列表' }
            },
            {
                path: 'add',
                component: BlogAdd,
                meta: { title: '发表博客' }
            },
            {
                path: 'edit/:id',
                component: BlogEdit,
                meta: { title: '编辑博客' }
            },
            {
                path: 'details/:id',
                component: BlogDetails,
                meta: { title: '博客详情' }
            }
        ]
    },
    {
        path: '/user/project',
        redirect: '/user/project/main',
        component: Layout,
        meta: {
            type: "user",
            icon: 'el-icon-service',
            title: '开源项目'
        },
        children: [
            {
                path: 'main',
                component: ProjectMain,
                meta: { title: '项目列表' }
            },
            {
                path: 'details/:name',
                component: ProjectDetails,
                meta: { title: '项目详情' }
            }
        ]
    },
    {
        path: '/user/configure',
        redirect: '/user/configure/main',
        component: Layout,
        meta: {
            type: "user",
            icon: 'el-icon-setting',
            title: '系统配置',
            LoginRequired: true
        },
        children: [
            {
                path: 'main',
                component: ConfigureMain,
                meta: { title: '系统配置' }
            }
        ]
    },



    {
        path: '/',
        redirect: '/user/new',
    },
    {
        path: "*",
        redirect: "/404"
    },

    
]




// const router = new Router({
//     routes: constantRouterMap,
//     scrollBehavior(to, from, savedPosition) {
//         if (to.meta.scrollTop) {
//             return { x: 0, y: 0 }
//         }
//     }
// })

// router.beforeEach((to, from, next) => {
//     console.log(to,from)

//     // Vue.prototype.$setTitle(to.meta.title)
//     next()
// })



// export default router