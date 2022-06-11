<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="handleClick(i)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <dialog-edit
      v-if="dialogs.edit"
      :task="task"
      @close="dialogs.edit = false"
    ></dialog-edit>

    <dialog-due-date
      v-if="dialogs.dueDate"
      :task="task"
      @close="dialogs.dueDate = false"
    ></dialog-due-date>

    <dialog-delete
      v-if="dialogs.delete"
      :task="task"
      @close="dialogs.delete = false"
    ></dialog-delete>
  </div>
</template>

<script>
import DialogEdit from '../Todo/Dialogs/DialogEdit.vue';
import DialogDueDate from '../Todo/Dialogs/DialogDueDate.vue';
import DialogDelete from '../Todo/Dialogs/DialogDelete.vue';

export default {
  components: {
    'dialog-edit': DialogEdit,
    'dialog-due-date': DialogDueDate,
    'dialog-delete': DialogDelete
  },
  props: ['task'],
  data: () => ({
    dialogs: {
      edit: false,
      dueDate: false,
      delete: false
    },
    items: [
      {
        title: 'Edit',
        icon: 'mdi-pencil',
        click() {
          this.dialogs.edit = true;
        }
      },
      {
        title: 'Due Date',
        icon: 'mdi-calendar',
        click() {
          this.dialogs.dueDate = true;
        }
      },
      {
        title: 'Delete',
        icon: 'mdi-delete',
        click() {
          this.dialogs.delete = true;
        }
      },
      {
        title: 'Sort',
        icon: 'mdi-drag-horizontal-variant',
        click() {
          this.$store.commit('toggleSorting');
        }
      }
    ]
  }),
  methods: {
    handleClick(i) {
      this.items[i].click.call(this);
    }
  }
};
</script>
