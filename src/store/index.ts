import { createStore } from 'vuex'

export default createStore({
  state: {
    bookDetail: {}
  },
  getters: {
  },
  mutations: {
    setBookDetail(state,payload){
      state.bookDetail = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
