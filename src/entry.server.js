import { createApp } from './app'

const isDev = process.env.NODE_ENV !== 'production'

export default (context) =>  {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()
    const { app, router, store } = createApp()

    const { url } = context
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    router.push(url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      console.log(matchedComponents);
      console.log('router ready.');
      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Data.now() -s}ms`);
        console.log('store: ',store.state);
        context.state = store.state
        resolve(app)
      }).catch(reject)

    }, reject)
  })

};
