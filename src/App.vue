<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :mobile-breakpoint="768" app>
      <v-img
        class="pa-4 pt-7"
        height="170"
        src="mnts.jpg"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <v-avatar size="70" class="mb-2">
          <img src="jer.jpg" alt="Jer" />
        </v-avatar>
        <div class="white--text text-subtitle-1 font-weight-bold">
          Jeramiah Coffey
        </div>
        <div class="white--text text-subtitle-2">jerrygcoffey</div>
      </v-img>

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

    <v-app-bar
      app
      absolute
      prominent
      color="primary"
      dark
      src="mnts.jpg"
      height="170"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-container class="header-container px-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search></search>
        </v-row>
        <v-row>
          <v-toolbar-title class="text-h4 ml-4">{{
            $store.state.appTitle
          }}</v-toolbar-title>
        </v-row>
        <v-row>
          <live-date-time></live-date-time>
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
import LiveDateTime from './components/Tools/LiveDateTime.vue';

export default {
  components: {
    'app-snackbar': AppSnackbar,
    search: SearchCmp,
    'live-date-time': LiveDateTime
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
<style lang="sass" scoped>
.header-container
  max-width: none !important
</style>
