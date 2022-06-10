<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Veutify Todos </v-list-item-title>
          <v-list-item-subtitle> Jeramiah Coffey </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app prominent absolute color="primary" dark src="mnts.jpg">
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-container class="px-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search></search>
        </v-row>
        <v-row>
          <v-toolbar-title class="ml-4">Vuetify Todos</v-toolbar-title>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <app-snackbar></app-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import AppSnackbar from './components/Shared/AppSnackbar.vue';
import SearchCmp from './components/Tools/SearchCmp.vue';

export default {
  components: {
    'app-snackbar': AppSnackbar,
    search: SearchCmp
  },
  data: () => ({
    drawer: null,
    items: [
      { title: 'Todos', icon: 'mdi-format-list-checks', to: '/' },
      { title: 'About', icon: 'mdi-help-box', to: '/about' }
    ]
  })
};
</script>
