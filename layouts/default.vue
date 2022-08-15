<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" app clipped color="dark">
      <template #prepend>
        <div class="ml-5 mr-5">
          <div>
            <div class="mb-5">

            </div>
            <span class="d-block text-body-2 title white--text">Admin</span>
          </div>
        </div>
        <v-divider> </v-divider>
      </template>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact exact-active-class="active-link"
          style="padding: 0px">
          <div class="d-flex pl-4">
            <v-list-item-action>
              <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text" v-text="item.title"> </v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app flat clipped-left color="primary">
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>
      <v-toolbar-title class="white--text title" v-text="title"> </v-toolbar-title>
      <v-spacer> </v-spacer>
    </v-app-bar>
    <v-main class="grey lighten-2">
      <v-container>
        <nuxt> </nuxt>
      </v-container>
    </v-main>
    <v-overlay :value="isLoading">
      <v-progress-circular color="secondary" indeterminate size="128">Cargando</v-progress-circular>
    </v-overlay>
    <SnackBar></SnackBar>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import SnackBar from '~/components/Shared/SnackBar.vue';
export default Vue.extend({
  name: "DefaultLayout",
  components: { SnackBar },
  data() {
    return {
      drawer: false,
      logo: require("../assets/images/logo.jpeg"),
      items: [
        {
          icon: "mdi-apps",
          title: "Inicio",
          to: "/",
        },
        {
          icon: "mdi-account",
          title: "Usuarios",
          to: "/users",
        },
      ],
      miniVariant: false,
      title: "Comision Pablito Jere" as string,
    };
  },
  computed: {
    isLoading(): boolean {
      return (this.$store.getters).isLoading;
    }
  },
})
</script>
<style>
.active-link {
  background-color: #32314e;
}
</style>