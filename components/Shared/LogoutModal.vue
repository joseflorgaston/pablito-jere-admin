<template>
    <v-card width="500">
        <v-card-title class="text-h5 white--text primary d-flex flex-wrap justify-content-between">
            ¿Cerrar sesión?
            <v-spacer />
            <v-btn icon title="Cerrar" color="error" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text class="mt-5 d-flex justify-center align-items-center">
            <h2>¿Desea cerrar sesión?</h2>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="logout"> Cerrar sesion </v-btn>
            <v-btn text @click="closeDialog"> Cancelar </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            isFormValid: false,
            login: {
                userName: '',
                password: '',
            },
            wasSubmitted: false,
            openModal: false,
            rules: [(v: string) => !!v || 'Por favor, completa este campo'],
            logo: require('../../assets/images/logo.jpeg')
        }
    },
    methods: {
        async logout() {
            await this.$auth.logout();
            this.$router.push('/login')
        },
        closeDialog() {
            this.$emit("closeDialog");
        }
    }
});
</script>