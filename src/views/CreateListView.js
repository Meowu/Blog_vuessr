import ArticleList from './ArticleList.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)
export default (type) =>  {
  return {
    name: `${camelize(type)}List`,

    asyncData({store, route}) {
      return store.dispatch('FETCH_LIST', {
        tab: type,
        limit: 15,
        page: 1
      })
    },

    title: camelize(type),

    render(h) {
      return h(ArticleList, {props: {type}})
    }
  }
};
