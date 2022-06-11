<template>
  <div class="home">
    <field-add-task></field-add-task>
    <list-tasks v-if="$store.state.tasks.length"></list-tasks>
    <no-tasks v-else></no-tasks>

    <button-done-sorting v-if="$store.state.sorting"></button-done-sorting>
  </div>
</template>

<script>
import FieldAddTask from '../components/Todo/FieldAddTask.vue';
import ListTasks from '../components/Todo/ListTasks.vue';
import NoTasks from '../components/Todo/NoTasks.vue';
import ButtonDoneSorting from '../components/Todo/ButtonDoneSorting.vue';

export default {
  components: {
    'field-add-task': FieldAddTask,
    'list-tasks': ListTasks,
    'no-tasks': NoTasks,
    'button-done-sorting': ButtonDoneSorting
  }
};
</script>
