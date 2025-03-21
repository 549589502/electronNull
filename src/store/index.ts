import { createStore } from 'vuex'

interface State {
  cacheViews: string[]
}

export default createStore<State>({
  state: () => ({
    cacheViews: []
  }),
  mutations: {
    ADD_CACHE_VIEW(state, viewName: string) {
      if (!state.cacheViews.includes(viewName)) {
        state.cacheViews.push(viewName)
      }
    },
    REMOVE_CACHE_VIEW(state, viewName: string) {
      const index = state.cacheViews.indexOf(viewName)
      if (index > -1) {
        state.cacheViews.splice(index, 1)
      }
    }
  }
})
