import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [
      // {
      //   id: 1,
      //   title: 'Wake up',
      //   done: false,
      //   dueDate: '2022-10-16'
      // },
      // {
      //   id: 2,
      //   title: 'Get bananas',
      //   done: false,
      //   dueDate: '2022-09-01'
      // },
      // {
      //   id: 3,
      //   title: 'Eat bananas',
      //   done: false,
      //   dueDate: null
      // }
    ],
    snackbar: {
      show: false,
      text: ''
    },
    sorting: false
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks
      }
      return state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase()))
    }
  },
  mutations: {
    setSearch(state, value) {
      state.search = value
    },
    addTask(state, newTask) {
      state.tasks.push(newTask);
    },
    doneTask(state, id) {
      let task = state.tasks.filter((task) => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.title = payload.title
    },
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.dueDate = payload.dueDate
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    showSnackbar(state, text) {
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout(() => {
        state.snackbar.text = text
        state.snackbar.show = true
      }, timeout)
    },
    hideSnackbar(state) {
      state.snackbar.show = false
    },
    toggleSorting(state) {
      state.sorting = !state.sorting
    }
  },
  actions: {
    getTasks({ commit }) {
      db.collection('tasks').get().then((tasks) => {
        commit('setTasks', tasks)
      })
    },
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      };
      db.collection('tasks').add(newTask).then(() => {
        commit('addTask', newTask)
        commit('showSnackbar', 'Task added!')
      })
    },
    doneTask({ state, commit }, id) {
      let task = state.tasks.filter((task) => task.id === id)[0];
      db.collection('tasks').doc({ id }).update({
        done:  !task.done
      }).then(() => {
        commit('doneTask', id)
      })
    },
    updateTaskTitle({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id}).update({
        title: payload.title
      }).then(() => {
        commit('updateTaskTitle', payload)
        commit('showSnackbar', 'Task updated!')
      })
    },
    updateTaskDueDate({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updateTaskDueDate', payload)
        commit('showSnackbar', 'Due date updated!')
      })
    },
    setTasks({ commit }, tasks) {
      commit('setTasks', tasks)
      db.collection('tasks').set(tasks)
    },
    deleteTask({ commit }, id) {
      db.collection('tasks').doc({ id }).delete().then(() => {
        commit('deleteTask', id)
        commit('showSnackbar', 'Task deleted!')
      })
    }
  }
})
