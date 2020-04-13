import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPlayer: {
      id: null,
      icon:'X'
    },
    myself: {
      id: null,
      icon:null
    },
  	history: {
      squares: Array(9).fill(null),
      winner:null,
      nextPlayer: null
    },
    score: Array()
  },
  getters:{
    getHistory: (state) => state.history,
    getCurrentPlayer: (state) => state.currentPlayer,
    getMyself: (state) => state.myself,
    getScore: (state) => state.score
  },
  mutations: {
    togglePlayer(state) {
      state.currentPlayer.icon = state.currentPlayer.icon == 'X' ? 'O' : 'X'
    },
    reset(state) {
      state.history =
    		{
          squares: Array(9).fill(null),
          winner: null,
          nextPlayer: null
        }
      state.currentPlayer.icon = state.history.winner ? state.hostory.winner : state.currentPlayer.icon
    },
    addHistory(state, payload) {
      state.history = payload
    },
    setCurrentPlayer(state, playerInfo) {
      state.currentPlayer = playerInfo
    },
    setMyself(state, myInfo) {
      state.myself = myInfo
    },
    setScore(state, score) {
      state.score = state.score.concat(score);
    },
  },
  actions: {
    //
  },
  modules: {
    //
  }
})
