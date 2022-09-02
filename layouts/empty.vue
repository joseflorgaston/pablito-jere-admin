<template>
  <v-app>
    <v-main>
      <nuxt />
    </v-main>
    <SnackBar></SnackBar>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import SnackBar from '~/components/Shared/SnackBar.vue';
export default Vue.extend({
  name: "LayoutEmpty",
  components: { SnackBar }
})
</script>

<style>
</style>
