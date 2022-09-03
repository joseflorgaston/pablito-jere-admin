<template>
    <div>
        <div class="d-flex justify-space-between pa-1 pb-3">
            <h2>Usuarios</h2>
            <v-btn color="primary" @click="showAddUserModal()">
                <v-icon>mdi-plus</v-icon>
                Agregar
            </v-btn>
        </div>
        <v-card>
            <v-data-table 
                :headers="tableHeaders" :items="items" :page="page" :items-per-page="itemsPerPage"
                :loading="loading" :footer-props="{
                    itemsPerPageOptions: [5, 10, 15],
                }">
                <template #[`item.actions`]="{ item }">
                    <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                            <v-btn 
                                icon :disabled="item.inOrder > 0" v-bind="attrs" @click="showDeleteModal(item)"
                                v-on="on">
                                <v-icon color="error" title="eliminar">mdi-delete</v-icon>
                            </v-btn>
                        </template>
                        <span>Eliminar Usuario</span>
                    </v-tooltip>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="showAddDialog" transition="dialog-top-transition" max-width="100%" width="600" persistent>
            <AddUserDialog @setUsers="setUsers" @setCount="setCount" @closeDialog="showAddUserModal()">
            </AddUserDialog>
        </v-dialog>
        <v-dialog v-model="showDeleteDialog" transition="dialog-top-transition" max-width="100%" width="500" persistent>
            <DeleteDialog 
            v-bind="deleteOptions" @closeDialog="closeDeleteModal()" @setUsers="setUsers" @setCount="setCount">
            </DeleteDialog>
        </v-dialog>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import DeleteDialog from '~/components/Shared/DeleteDialog.vue';
import AddUserDialog from '~/components/Users/AddUserDialog.vue';

export default Vue.extend({
    name: 'UsersComponent',
    components: { DeleteDialog, AddUserDialog },
    middleware: 'auth',
    data() {
        return {
            count: 0,
            page: 0,
            itemsPerPage: 10,
            loading: true,
            showDeleteDialog: false,
            showAddDialog: false,
            deleteOptions: {},
            items: [],
            tableHeaders: [
                {
                    text: 'Nombre de usuario',
                    value: 'userName',
                    class: 'header-color white--text',
                },
                {
                    text: 'Email',
                    value: 'email',
                    class: 'header-color white--text',
                },
                {
                    text: 'Acciones',
                    value: 'actions',
                    class: 'header-color white--text',
                },
            ],
        }
    },
    async beforeMount() {
        try {
            this.$store.commit('setLoading');
            await this.getUsers();
        } catch (error) {

        } finally {
            this.loading = false;
            this.$store.commit('setLoading');
        }
    },
    methods: {
        async getUsers() {
            const response = await this.$axios.get("accounts/users");
            this.items = response.data.users;
            this.count = response.data.count;
        },
        setUsers(users:[]) {
            console.log(users);
            this.items = users;
        },
        setCount(count:number) {
            console.log(count)
            this.count = count;
        },
        showAddUserModal() {
            this.showAddDialog = !this.showAddDialog;
        },
        showDeleteModal(user: any) {
            this.deleteOptions = {
                title: "Usuario",
                name: user.userName,
                removeUrl: `publications/${user.id}`
            }
            this.showDeleteDialog = true;
        },
        closeDeleteModal(){
            this.showDeleteDialog = false;
        }

    }
})
</script>