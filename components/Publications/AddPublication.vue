<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <v-form v-model="isValid">
        <v-card>
            <v-toolbar color="primary" dark>
                <div class="row align-center px-lg-3">
                    Agregar nueva publicacion
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
                            prepend-inner-icon="mdi-camera" accept="image/png, image/jpeg" outlined rounded
                            @change="onUploadFile($event)">
                        </v-file-input>
                    </v-col>
                    <v-col v-show="uploadedImages.length > 0" cols="12" style="height: fit-content;">
                        <div class="d-flex justify-space-between">
                            <h4>Imagenes</h4>
                            <v-btn icon color="red" title="borrar imagen" @click="deleteImage()">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </div>
                        <v-carousel v-model="carousel">
                            <v-carousel-item v-for="(image, i) in uploadedImages" :key="i">
                                <v-img contain lazy-src="https://picsum.photos/id/11/10/6" max-height="500"
                                    max-width="900" :src=image.imageSrc></v-img>
                            </v-carousel-item>
                        </v-carousel>
                    </v-col>
                    <v-col cols="12">
                        <h3>Titulo</h3>
                        <v-text-field v-model="title" :rules="rules" outlined solo
                            placeholder="Título de la publicación">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <h3>Descripción</h3>
                        <v-textarea v-model="description" :rules="rules" solo outlined placeholder="Descripción">
                        </v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn :disabled="!isValid || uploadedImages.length == 0" color="primary" @click="savePublication()">
                    Guardar</v-btn>
                <v-btn text @click="closeDialog()">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>
<script lang="ts">
import Vue from 'vue'
import { PublicationImage } from '../../models/PublicationImage';
import { Publication } from '~/models/Publication';
export default Vue.extend({
    name: "AddPublication",
    data() {
        return {
            rules: [(v: any) => !!v || 'Este campo es requerido'],
            title: "" as string,
            description: "" as string,
            uploadedImages: [] as PublicationImage[],
            carousel: null,
            isValid: false,
        }
    },
    methods: {
        closeDialog() {
            this.$emit('closeDialog');
        },
        async savePublication() {
            try {
                this.$store.commit('setLoading');
                this.closeDialog();
                const publication = {
                    title: this.title,
                    description: this.description,
                    publicationImages: this.uploadedImages.map(x => x.imageSrc)
                }
                const response = await this.$axios.post("Publications", publication);
                console.log(response);
            } catch (error) {
                console.log(error);
            } finally {
                this.$store.commit('setLoading');
            }
        },

        deleteImage() {
            this.uploadedImages.splice(this.carousel, 1);
        },

        async onUploadFile(event: FileList) {
            const file: File = event[0];
            const base64File: string = await this.fileToBase64(file);
            this.uploadedImages.push({ imageSrc: base64File });
        },

        fileToBase64(file: File): Promise<string> {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result?.toString() || '');
                reader.onerror = error => reject(error);
            })
        }
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