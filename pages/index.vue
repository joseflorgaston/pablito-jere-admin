<template>
  <div>
    <div class="row flex-wrap">
      <div class="col-12 col-sm-6 col-lg-2">
        <h2>Publicaciones</h2>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <v-btn color="primary" @click="showAddDialog()">
          <v-icon>mdi-plus</v-icon>
          Agregar
        </v-btn>
        <v-btn :disabled="publication.title == null" class="mx-2" color="info" @click="showEditDialog()">
          <v-icon>mdi-pencil</v-icon>
          Editar
        </v-btn>
        <v-btn :disabled="publication.title == null" class="my-2" color="red white--text" @click="showDeleteDialog()">
          <v-icon>mdi-delete</v-icon>
          Eliminar
        </v-btn>
      </div>
    </div>
    <div class="row word-break mt-1">
      <div class="col-12 col-lg-3 mt-lg-9">
        <div class="white publications-card">
          <div v-for="(item, i) in publications" :key="i">
            <div :id="'publication' + i" class="select-publication" :tabindex="i" @click="setPublication(item, i)">
              {{ item.title }}
            </div>
            <v-divider class="my-1"></v-divider>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-9 text-center">
        <h2>Muestra</h2>
        <v-img :src="publication.imageUrl" :lazy-src="logo" width="100%" style="max-height:60vh; object-fit: contain;">
        </v-img>
        <h4>{{ publication.title }}</h4>
        <span>{{ publication.description }}</span>
      </div>
    </div>
    <v-dialog v-model="showDialog" transition="dialog-top-transition" max-width="100%" width="900" persistent>
      <AddPublication @closeDialog="closeDialog()"></AddPublication>
    </v-dialog>
    <v-dialog v-model="deleteDialog" transition="dialog-top-transition" max-width="100%" width="500" persistent>
      <DeleteDialog
        title="publicacion" :edit-item="{ name: 'Publicacion 1' }" delete-url="" get-url=""
        @closeDialog="showDeleteDialog()"></DeleteDialog>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AddPublication from '~/components/Publications/AddPublication.vue';
import DeleteDialog from '~/components/Shared/DeleteDialog.vue';
import { Publication } from '~/models/Publication';


export default Vue.extend({
  name: 'IndexPage',
  components: { AddPublication, DeleteDialog },
  data() {
    return {
      showDialog: false,
      deleteDialog: false,
      publication: {} as Publication,
      publications: [] as Publication[],
      logo: require('../assets/images/logo.jpeg'),
    }
  },
  beforeMount() {
    this.publications = [
      {
        title: "Publicacion 1",
        description: "Esta es una descripcion",
        publicationImages: [{imageSrc: "https://fondosmil.com/fondo/11800.jpg"}]
      },
      {
        title: "Publicacion 2",
        description: "Esta es una descripcion",
        publicationImages: [{imageSrc: "https://fondosmil.com/fondo/11800.jpg"}]
      },
      {
        title: "Publicacion 3",
        description: "Esta es una descripcion",
        publicationImages: [{imageSrc: "https://fondosmil.com/fondo/11800.jpg"}]
      },
      {
        title: "Publicacion 4",
        description: "Esta es una descripcion",
        publicationImages: [{imageSrc: "https://fondosmil.com/fondo/11800.jpg"}]
      },
    ];
  },
  methods: {
    addSelectedClass(key: number) {
      const lastSelected = document.getElementsByClassName("selected-publication") as HTMLCollectionOf<Element>;
      [].forEach.call(lastSelected, function (element: Element) {
        element.classList.remove("selected-publication");
      })
      const newSelected = document.getElementById("publication" + key) as HTMLElement;
      newSelected.classList.add("selected-publication");
    },
    setPublication(item: Publication, key: number) {
      this.addSelectedClass(key);
      this.publication = item;
    },
    showAddDialog() {
      this.showDialog = !this.showDialog;
    },
    showEditDialog() {
      this.showDialog = !this.showDialog;
    },
    showDeleteDialog() {
      this.deleteDialog = !this.deleteDialog;
    },
    closeDialog() {
      this.showDialog = false;
    }
  },

});
</script>
<style>
.publications-card {
  width: 600px;
  max-width: 100%;
  max-height: 60vh;
  height: fit-content;
  overflow-y: auto;
  padding: 0.5rem;
}

.word-break {
  word-break: break-all;
}

.select-publication {
  padding: 1rem;
  cursor: pointer;
}

.select-publication:hover {
  background-color: palegoldenrod
}

.selected-publication {
  background-color: #0c0c22 !important;
  color: white !important;
}
</style>