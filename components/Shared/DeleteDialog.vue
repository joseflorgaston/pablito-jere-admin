<template>
    <v-card>
        <v-card-title class="text-h5 white--text primary">
            ¿Deseas eliminar esta {{ title }}?
            <v-spacer></v-spacer>
            <v-btn icon color="error" @click="closeDialog">
                <v-icon color="white"> mdi-close </v-icon>
            </v-btn>
        </v-card-title>

        <div class="ma-8 d-flex justify-center">
            <h2>{{ name }}</h2>
        </div>
        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="deleteItem"> Eliminar </v-btn>
            <v-btn text @click="closeDialog"> Cancelar </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    props: {
        title: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        removeUrl: {
            type: String,
            required: true,
        },
    },
    methods: {
        async deleteItem() {
            try {
                this.$store.commit('setLoading')
                this.closeDialog();
                this.$store.commit('setSuccess', "Eliminado exitosamente");
                await this.$axios.$delete(`${this.removeUrl}/`);
                await this.$emit('getPublications');
            } catch (error) {
                this.$store.commit('setError', 'Ha ocurrido un error');
            } finally {
                this.$store.commit('setLoading');
            }
        },
        closeDialog() {
            this.$emit('closeDialog');
        },
    },
})
</script>

<style>
</style>