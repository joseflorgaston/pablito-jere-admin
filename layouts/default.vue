
<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" app clipped>
      <template #prepend>
        <div class="ml-5 mr-5">
          <div>
            <div class="mb-5">
              <v-img :lazy-src="logo" max-height="150" max-width="250" contain :src="logo"></v-img>
            </div>
            <span class="d-block text-body-2 title">Admin</span>
          </div>
        </div>
        <v-divider />
      </template>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact exact-active-class="active-link"
          style="padding: 0px">
          <div class="d-flex pl-4">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </div>
        </v-list-item>
        <v-list-item to="/users" router exact exact-active-class="active-link" style="padding: 0px">
          <div class="d-flex pl-4">
            <v-list-item-action>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="'Usuarios'" />
            </v-list-item-content>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app flat clipped-left color="primary">
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />

      <v-toolbar-title class="white--text title" v-text="title" />
      <v-spacer />
    </v-app-bar>

    <v-main class="grey lighten-4">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-overlay :value="isLoading">
      <v-progress-circular color="primary" indeterminate size="128"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Inicio',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      title: 'Vuetify.js',
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    }
  },
}
</script>
