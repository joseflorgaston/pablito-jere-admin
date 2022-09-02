<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <div>
    <div class="row flex-wrap">
      <div class="col-12 col-sm-6 col-lg-2">
        <h2>Publicaciones</h2>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <v-btn color="primary" @click="showOrCloseAddDialog()">
          <v-icon>mdi-plus</v-icon>
          Agregar
        </v-btn>
        <v-btn :disabled="publication.title == null" class="mx-2" color="info" @click="showOrCloseEditDialog()">
          <v-icon>mdi-pencil</v-icon>
          Editar
        </v-btn>
        <v-btn :disabled="publication.title == null" class="my-2" color="red white--text"
          @click="showOrCloseDeleteDialog()">
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
        <h2>{{publication.title}}</h2>
        <v-carousel v-model="carousel" class="dark">
          <v-carousel-item v-for="(image, i) in publication.publicationImages" :key="i">
            <v-img contain :lazy-src="loadingImage" :src=image.imageUrl width="100%" style="max-height:53vh;"></v-img>
          </v-carousel-item>
        </v-carousel>
        <span>{{ publication.description }}</span>
      </div>
    </div>
    <v-dialog v-model="showDialog" transition="dialog-top-transition" max-width="100%" width="900" persistent>
      <AddPublication @closeDialog="showOrCloseAddDialog()" @getPublications="getPublications()"></AddPublication>
    </v-dialog>
    <v-dialog v-model="showEditDialog" transition="dialog-top-transition" max-width="100%" width="900" persistent>
      <EditPublication v-bind="publication" @closeDialog="showOrCloseEditDialog()" @getPublications="getPublications()">
      </EditPublication>
    </v-dialog>
    <v-dialog v-model="showDeleteDialog" transition="dialog-top-transition" max-width="100%" width="500" persistent>
      <DeleteDialog v-bind="deleteOptions" @getPublications="getPublications()" @closeDialog="showOrCloseDeleteDialog()"></DeleteDialog>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AddPublication from '~/components/Publications/AddPublication.vue';
import DeleteDialog from '~/components/Shared/DeleteDialog.vue';
import EditPublication from '~/components/Publications/EditPublication.vue';
import { Publication } from '~/models/Publication';


export default Vue.extend({
  name: 'IndexPage',
  components: { AddPublication, DeleteDialog, EditPublication },
  middleware: 'auth',
  data() {
    return {
      showDialog: false,
      showEditDialog: false,
      showDeleteDialog: false,
      carousel: 0,
      publication: {} as Publication,
      publications: [] as Publication[],
      deleteOptions: {},
      logo: require('../assets/images/logo.jpeg'),
      loadingImage: require('../assets/images/loading.gif')
    }
  },
  async beforeMount() {
    try {
      this.$store.commit('setLoading');
      await this.getPublications();
    } catch (error) {
      this.$store.commit('setError', "Ha ocurrido un error, intentelo de nuevo mas tarde");
    } finally {
      this.$store.commit('setLoading');
    }
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
    testSnackbar() {
      this.$store.commit('setSuccess', "Xddddd");
    },
    showOrCloseAddDialog() {
      this.showDialog = !this.showDialog;
    },
    showOrCloseEditDialog() {
      this.showEditDialog = !this.showEditDialog;
    },
    showOrCloseDeleteDialog() {
      this.deleteOptions = {
        title: "Publicación",
        name: this.publication.title,
        removeUrl: `publications/${this.publication.id}`
      }
      this.showDeleteDialog = !this.showDeleteDialog;
    },
    async getPublications() {
      this.publications = (await this.$axios.get("publications")).data as Publication[];
      this.publications.length > 0 ? this.publication = this.publications[0] : this.publication = {
        id: 0,
        title: null,
        description: null,
        publicationImages: []
      };
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