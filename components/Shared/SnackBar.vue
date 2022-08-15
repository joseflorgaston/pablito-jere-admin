<template>
    <v-snackbar v-model="snackbar" timeout="4000" :color="snackbarColor">
        {{ message }}
    </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'SnackbarComponent',
    computed: {
        snackbarColor(): string {
            return this.$store.getters.color;
        },
        message(): string {
            return this.$store.getters.message
        },
        snackbar: {
            get(): boolean {
                return this.$store.getters.snackbar
            },
            set(value): void {
                return this.$store.commit('closeSnackbar', value)
            },
        },
    }
})
</script>