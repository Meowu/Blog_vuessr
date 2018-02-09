import Vue from "vue";
import { createApp } from "./app";
import VBar from './plugins/v-progressbar'
Vue.use(VBar)

Vue.mixin({
  methods: {  // 方法没有注入
    formatDate(timestamp, format='yyyy-MM-dd HH:mm') {
      if (!Number(timestamp)) {
        throw new Error("parameter must be a Number.")
      }
      const len = timestamp.toString().length
      if (len !== 10 && len !== 13) { // 这里必须是 && 并集。
        throw new Error('Number expected to be 10 or 13 at length.')
      }
      const time = Number(timestamp).toString().length === 10 ? timestamp*1000 : timestamp
      
      const padZero = number => number.toString().replace(/^(\d)$/, "0$1") // 补0
      const newDate = new Date(Number(time))
      const year = newDate.getFullYear()
      const month = newDate.getMonth() + 1
      const date = newDate.getDate()
      const hours = newDate.getHours()
      const minutes = newDate.getMinutes()
      
      switch (format) {
        case 'yyyy-MM-dd':
          return `${padZero(year)}-${padZero(month)}-${padZero(date)}`
          break;
        case 'MM-dd':
          return `${padZero(month)}-${padZero(date)}`
          break;
        case 'HH:mm':
          return `${padZero(hours)}:${padZero(minutes)}`
          break
        default:
          return `${padZero(year)}-${padZero(month)}-${padZero(date)} ${padZero(hours)}:${padZero(minutes)}`
      }
    }
  },
  // beforeRouteUpdate(to, from, next) {
  //   const { asyncData } = this.$options;
  //   if (asyncData) {
  //     asyncData({
  //       store: this.$store,
  //       route: to
  //     })
  //       .then(next)
  //       .catch(next);
  //   } else {
  //     next();
  //   }
  // }
});

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {  // _ _ ... _
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c);
    });
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);
    if (!asyncDataHooks.length) {
      return next();
    }
    // 如果有状态栏则在这里开始。
    app.$bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        // 结束状态栏
        app.$bar.finish()
        next();
      })
      .catch(next);
  });

  app.$mount("#app");
});
