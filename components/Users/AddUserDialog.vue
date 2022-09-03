<template>
    <v-form v-model="isValid">
        <v-card>
            <v-toolbar color="primary" dark>
                <div class="row align-center px-lg-3">
                    Registrar nuevo administrador
                    <v-spacer></v-spacer>
                    <v-btn class="mx-2" fab dark small color="primary" @click="closeDialog">
                        <v-icon dark>
                            mdi-close
                        </v-icon>
                    </v-btn>
                </div>
            </v-toolbar>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <h3 class="mb-2">Nombre de usuario</h3>
                        <v-text-field 
                            v-model="user.userName" :rules="rules" solo outlined
                            placeholder="Nombre de usuario" maxlength="16">

                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <h3 class="mb-2">Correo</h3>
                        <v-text-field 
                            v-model="user.email" :rules="rules" solo outlined placeholder="Correo"
                            maxlength="40">

                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <h3 class="mb-2">Contrasena</h3>
                        <v-text-field 
                            id="password" v-model="user.password" :rules="rules" solo outlined 
                            placeholder="Contrasena" :type="value ? 'password' : 'text'" maxlength="12" 
                            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'" @click:append="() => (value = !value)">
                            
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <h3 class="mb-2">Confirmar contrasena</h3>
                        <v-text-field 
                            v-model="confirmPass" :rules="[rules[0], passwordConfirmationRule]" solo outlined placeholder="Contrasena"
                            type="password" maxlength="12">
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn :disabled="!isValid" color="primary" @click="saveUser()">
                    Guardar
                </v-btn>
                <v-btn text @click="closeDialog()">Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>
<script lang="ts">
import Vue from 'vue';
import { User } from '../../models/User';
export default Vue.extend({
    data() {
        return {
            isValid: false,
            rules: [(v: any) => !!v || 'Este campo es requerido'],
            confirmPass: "",
            value: true,
            user: {
                userName: "",
                email: "",
                password: ""
            } as User,
        }
    },
    computed: {
        passwordConfirmationRule() {
            return () => (this.user.password === this.confirmPass) || 'Las contrasenas no coinciden'
        },
    },
    methods: {
        async saveUser() {
            try {
                this.$store.commit("setLoading");
                this.closeDialog();
                await this.$axios.post("accounts/register", this.user);
                const response = await this.$axios.get("accounts/users");
                this.$emit("setCount", response.data.count);
                this.$emit("setUsers", response.data.users);
                this.$store.commit("setLoading");
                this.$store.commit('setSuccess', "Usuario creado exitosamente");
            } catch (error) {
                console.log(error);
                this.$store.commit('setError', "Ha ocurrido un error");
            }
        },
        closeDialog() {
            this.$emit('closeDialog');
        },
    }
});
</script>