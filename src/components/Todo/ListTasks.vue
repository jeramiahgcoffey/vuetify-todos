<template>
  <v-list class="pt-0" flat>
    <task-item
      v-for="task in $store.getters.tasksFiltered"
      :key="task.id"
      :task="task"
    ></task-item>
  </v-list>
</template>

<script>
import TaskItem from './TaskItem.vue';

export default {
  components: {
    'task-item': TaskItem
  }
};
</script>
