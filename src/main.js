// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vue from "vue";
import Vuex from "vuex";

import App from "./App";
import util from "./utils/util";
import router from "./router";
import Router from "vue-router";

import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import "mavon-editor/dist/markdown/github-markdown.min.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import Vant from "vant";
// import 'vant/lib/index.css'
// import DefaultLayout from '~/layouts/Default.vue'
import DefaultLayout from "~/layouts/Layout.vue";

import token from "./store/modules/token";
import user from "./store/modules/user";
import configuration from "./store/modules/configuration";
import getters from "./store/getters";

export default function(Vue, { router, appOptions, isClient }) {
  Vue.use(Vuex);
  Vue.use(Router);
  if (typeof window !== "undefined") {
    Vue.use(Vant);
    Vue.use(ElementUI);
    Vue.use(mavonEditor);
    Vue.prototype.$markdown = function(value) {
      return mavonEditor.markdownIt.render(value);
    };
  }
  Vue.prototype.$util = util;
  appOptions.store = new Vuex.Store({
    modules: {
      token,
      user,
      configuration,
    },
    getters,
  });
  // router = new Router({
  //   routes: constantRouterMap,
  //   scrollBehavior(to, from, savedPosition) {
  //     if (to.meta.scrollTop) {
  //       return { x: 0, y: 0 };
  //     }
  //   },
  // });

  router.beforeEach((to, from, next) => {
    console.log(to, from);

    // Vue.prototype.$setTitle(to.meta.title)
    next();
  });

  Vue.config.productionTip = false;
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
}
