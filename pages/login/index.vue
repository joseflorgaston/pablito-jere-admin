<template>
    <div class="container d-flex flex-column align-center justify-center">
        <v-card class="pa-16" raised>
            <div class="d-flex justify-center mb-10">
                <v-img 
                lazy-src="https://picsum.photos/id/11/10/6" :src="require('../../assets/images/logo.png')" alt="logo"
                width="200" height="100%" />
            </div>
            <div class="d-flex justify-center">
                <h3 class="primary--text">Iniciar Sesion</h3>
            </div>
            <v-form ref="form" v-model="isFormValid" style="width: 100%" @submit.prevent="userLogin">
                <div class="field">
                    <v-text-field v-model="login.userName" label="Usuario" :rules="rules"></v-text-field>
                </div>

                <div class="field">
                    <v-text-field v-model="login.password" label="Contraseña" type="password" :rules="rules">
                    </v-text-field>
                </div>

                <div class="field d-flex justify-center mt-8 mb-8">
                    <v-btn 
                    type="submit" color="primary" rounded :disabled="!isFormValid || wasSubmitted"
                        :loading="wasSubmitted" @click="userLogin()">INGRESAR</v-btn>
                </div>
            </v-form>
        </v-card>
    </div>
</template>

<script lang="ts">
import { HTTPResponse } from '@nuxtjs/auth-next';
import Vue from 'vue';

export default Vue.extend({
    name: "LoginIndex",
    layout: 'empty',
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
        async userLogin() {
            this.$store.commit('setLoading');

            this.wasSubmitted = true
            try {
                this.login.userName = this.login.userName.trim();
                const response = await this.$auth.loginWith('local', {
                    data: this.login,
                }) as HTTPResponse;

                this.$auth.setUser(response.data)
                this.$auth.$storage.setLocalStorage('user', response.data)
                await this.$router.push({ path: '/' })
            } catch (e) {
                console.log(e)
                this.wasSubmitted = false
                this.$store.commit('setError', 'Credenciales incorrectos')
            } finally {
                this.wasSubmitted = false
                this.$store.commit('setLoading')
            }
        },
        async sendForgotPasswordEmail() {
            try {
                await this.$axios.$post('/identity/reset-password-token', {
                    emailAddress: this.login.userName,
                })
                this.$store.commit(
                    'setSuccess',
                    'El correo fue enviado a ' + this.login.userName
                )
                this.openModal = true
            } catch (e) {
                console.log(e)
                this.$store.commit('setError', e.toString())
            }
        },
        register() {
            // this.$router.push('registro')
        },
    },
})
</script>

<style>
.container {
    width: 100%;
    height: 100%;
}

.field {
    width: 100%;
}
</style>

