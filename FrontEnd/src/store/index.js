import { createStore } from 'vuex'

export default createStore({
  state: {
    displayMode: 'vis',
    detailShow: -1,
    detailData: null,
    
  },
  
  getters: {

  },
  mutations: {
    ['UPDATE_DISPLAY_MODE'] (state, displayMode) {
      state.displayMode = displayMode
    }, 
    setDetailShow(state,value){
      state.detailShow = value
    },
    setDetailData(state,value){
      state.detailData = value
    },
    // setTodoList(state,value){
    //   state.todo_list = value
    // }

  },
  actions: {

  },
  modules: {

  }
})
