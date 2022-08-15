<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <v-form v-model="isValid">
        <v-card>
            <v-toolbar color="primary" dark>
                <div class="row align-center px-lg-3">
                    Editar nueva publicacion
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
                        <h3 class="mb-2">Subir Portada de publicacion</h3>
                        <v-file-input id="publicationImages" chips multiple label="Imagenes"
                            prepend-inner-icon="mdi-camera" accept="image/png, image/jpeg, image/jpg" outlined rounded
                            @change="onUploadFile($event)">
                        </v-file-input>
                    </v-col>
                    <v-col v-show="publication.publicationImages.length > 0" cols="12" style="height: fit-content;">
                        <div class="d-flex justify-space-between">
                            <h4>Imagenes</h4>
                            <v-btn icon color="red" title="borrar imagen" @click="deleteImage()">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </div>
                        <v-carousel v-model="carousel">
                            <v-carousel-item v-for="(image, i) in publication.publicationImages" :key="i">
                                <v-img class="carouselImage" contain lazy-src="https://picsum.photos/id/11/10/6"
                                    max-height="500" max-width="900" :src=image.imageUrl></v-img>
                            </v-carousel-item>
                        </v-carousel>
                    </v-col>
                    <v-col cols="12">
                        <h3>Titulo</h3>
                        <v-text-field v-model="publication.title" :rules="rules" outlined solo
                            placeholder="Título de la publicación" maxlength="120">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <h3>Descripción</h3>
                        <v-textarea v-model="publication.description" :rules="rules" solo outlined
                            placeholder="Descripción" maxlength="1200">
                        </v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn :disabled="!isValid || publication.publicationImages.length == 0" color="primary"
                    @click="editPublication()">
                    Guardar</v-btn>
                <v-btn text @click="closeDialog()">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>
<script lang="ts">
import Vue from 'vue'
import { PublicationImage } from '../../models/PublicationImage';
import { Publication } from '../../models/Publication';
import { capitalize, fileToBase64, urlToBase64 } from '../../utilities/SharedFunctions';
export default Vue.extend({
    name: "EditPublication",
    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        publicationImages: {
            type: Array,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            rules: [(v: any) => !!v || 'Este campo es requerido'],
            publication: {
                title: this.title as string,
                description: this.description as string,
                publicationImages: this.publicationImages as PublicationImage[]
            } as Publication,
            carousel: null as any,
            isValid: false,
        }
    },
    methods: {
        closeDialog() {
            this.$emit('closeDialog');
        },
        async editPublication() {
            try {
                this.$store.commit('setLoading');
                const images = await this.convertImages(this.publication.publicationImages.map(x => x.imageUrl)) as string[];
                this.closeDialog();
                const publication = this.getPublication(images)
                await this.$axios.put(`Publications/${publication.id}`, publication);
                await this.$emit('getPublications');
                this.$store.commit('setSuccess', "Publicación editada exitosamente");
            } catch (error) {
                this.$store.commit('setError', error.toString());
            } finally {
                this.$store.commit('setLoading');
            }
        },

        getPublication(images: string[]) {
            return {
                id: this.id,
                title: capitalize(this.publication.title),
                description: capitalize(this.publication.description),
                publicationImages: images
            };
        },
        async convertImages(imagesUrl: string[]): Promise<(string | ArrayBuffer)[]> {
            const promises = [];
            for (let i = 0; i < imagesUrl.length; i++) {
                promises.push(await urlToBase64(imagesUrl[i]));
            }
            const imagesData = await Promise.all(promises);
            return imagesData;
        },

        deleteImage() {
            this.publication.publicationImages.splice(this.carousel, 1);
        },

        async onUploadFile(event: FileList) {
            if (event == null) return;
            if (event.length === 0) return;
            const file: File = event[0];
            const base64File: string = await fileToBase64(file);
            this.publication.publicationImages.push({ imageUrl: base64File });
        },

    }
});
</script>
<style>
.carousel-images {
    width: 100%;
    height: fit-content;
    max-width: 100%;
}

.carousel-image {
    height: 100%;
    width: 100%;
    object-fit: contain !important;
}

.carousel {
    max-height: 300px;
}
</style>