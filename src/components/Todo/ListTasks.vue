<template>
  <v-list class="pt-0" flat>
    <draggable v-model="tasks" handle=".handle">
      <task-item v-for="task in tasks" :key="task.id" :task="task"></task-item>
    </draggable>
  </v-list>
</template>

<script>
import draggable from 'vuedraggable';
import TaskItem from './TaskItem.vue';

export default {
  components: {
    'task-item': TaskItem,
    draggable
  },
  computed: {
    tasks: {
      get() {
        return this.$store.getters.tasksFiltered;
      },
      set(value) {
        this.$store.commit('setTasks', value);
      }
    }
  }
};
</script>
