import Vue from "vue";
import { createApp } from "./app";

Vue.mixin({
  filters: {
    formatTime: function (value) {
      let interval = Date.now() - Date.parse(value)
      if (interval / (1000*60*60*24*30*12) >= 1) {
        return `${parseInt(interval / (1000*60*60*24*30*12))}年前`
      } else if (interval / (1000*60*60*24*30) >= 1) {
        return `${parseInt(interval / (1000*60*60*24*30))}个月前`
      } else if (interval / (1000*60*60*24) >= 1) {
        return `${parseInt(interval / (1000*60*60*24))}天前`
      } else if (interval / (1000*60*60) >= 1) {
        return `${parseInt(interval / (1000*60*60))}小时前`
      } else if (interval / (1000*60) >= 1) {
        return `${parseInt(interval / (1000*60))}分钟前`
      }
    },
    formatTab: function (value) {
      switch (value) {
        case 'ask':
          return '问答';
          break;
        case 'share':
          return '分享';
          break;
        case 'good':
          return '精华';
          break;
        case 'job':
          return '招聘';
          break;
        case 'dev':
          return '测试';
          break;
        default:
          return '置顶';
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      })
        .then(next)
        .catch(next);
    } else {
      next();
    }
  }
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
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        // 结束状态栏
        next();
      })
      .catch(next);
  });

  app.$mount("#app");
});
