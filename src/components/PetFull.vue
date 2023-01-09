<template>
    <!-- shows full information from the pet, and the operations you can perform -->

    <v-card class="tw-p-5" v-if="pet">

        <v-card-title>{{ pet.name.toUpperCase() }}</v-card-title>

        <v-card-subtitle>{{ pet.status.toUpperCase() }}</v-card-subtitle>
        
        <v-card-text v-if="category"> {{ category.name.toUpperCase() }} </v-card-text>

        <div
        class="tw-flex tw-flex-wrap tw-justify-center tw-gap-4 tw-my-4">
            <v-card v-for="url in pet.photoUrls" :key="url">
                <v-img
                :src="url"
                height="200px"
                width="200px">
                </v-img>
            </v-card>
        </div>

        <div class="tw-flex tw-justify-around">
            <v-btn class="tw-m-2"
            rounded="pill"
            color="primary"
            v-for="tag in pet.tags" :key="tag">
                {{tag}}
            </v-btn>
        </div>

        <div class="tw-flex tw-justify-around tw-my-4">
            <v-btn @click="handleDeletePet">
                Delete
            </v-btn>
            <v-btn @click="handleEditPet">
                Edit
            </v-btn>
            <v-btn @click="handleUpdatePet">
                Update
            </v-btn>
        </div>

        <!-- shows if there are errors after submitting the delete req -->


        <div v-if="errorDelete" class="tw-my-3">
            <v-alert type="error"> {{ errorDelete.message }} </v-alert>
        </div>

    </v-card> 
</template>

<script setup>
import { errorCategories, getCategories } from '@/composables/Get.js';
import { errorDelete, deletePet } from '@/composables/CreateDelete';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  pet: {
    type: Object,
    default: () => ({
      name: '',
      category: 0,
      photoUrls: [],
      tags: [],
      status: ''
    })
  }
});
const pet = props.pet;
const category = ref(null);

// get the categories from the server to assign the id obtained from the pet to a string

getCategories()
    .then(data => category.value = data.find(categ => categ.id === pet.category))
    .catch(err => console.log(err))

// handles the delete request

const handleDeletePet = async () => {
    await deletePet(pet.id);
    if (!errorDelete.value) router.push({name: 'home'});
}

// redirects to the form to edit pet info

const handleEditPet = async () => {
    router.push({ name: 'create', params: { id: pet.id }, query: { edit: true } })
}

// redirect to the form to update pet info

const handleUpdatePet = async () => {
    router.push({ name: 'create', params: { id: pet.id }, query: { update: true } })

}

</script>