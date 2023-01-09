<template>
    <v-form @submit.prevent v-if="categories" class="tw-w-full sm:tw-w-[75%]  lg:tw-w-[55%]">

      <v-text-field label="Name" v-model="name"></v-text-field>

      <v-select
        label="Category"
        :items="categories"
        v-model="category"
      ></v-select>
      
      <v-radio-group inline v-model="status">
        <v-radio label="Available" value="available"></v-radio>
        <v-radio label="Pending" value="pending"></v-radio>
        <v-radio label="Sold" value="sold"></v-radio>
      </v-radio-group>

      <p>Add URLS to the pet pictures. (only valid urls containing pictures will be added.)</p>

      <p>Press enter to add an URL. (add at least one)</p>

      <v-text-field label="Photo URLS" @keypress.enter.prevent="addUrl" v-model.trim="currentUrl"></v-text-field>

      <div class="tw-flex tw-flex-col tw-w-full">
        <div class="tw-flex tw-justify-between tw-w-full tw-my-2" v-for="(url, idx) in photoUrls" :key="url">
          <a :href="url" target="_blank" class="tw-text-[blue]"> {{ url.substring(0, 50) }}... </a>
          <v-btn color="red" @click="removeURL(idx)">Remove</v-btn>
        </div>
      </div>

      <p>Press enter to add a tag. (add at least one)</p>

      <v-text-field label="Tags" @keypress.enter.prevent="addTag" v-model.trim="currentTag"></v-text-field>

      <div class="tw-flex tw-gap-[5px]">
        <div v-for="(tag, idx) in tags" :key="tag">
          <v-btn
          rounded="pill"
          color="primary"
          @click="removeTag(idx)">
            {{tag}}
          </v-btn> 
        </div>
      </div>

      <p v-if="tags.length" class="tw-my-2">Click on a tag to remove a tag.</p>

      <v-btn @click="handleCreate"
      :disabled="invalid" v-if="!route.query.update">Add Pet</v-btn>

      <v-btn @click="handleCreate"
      :disabled="invalid" v-else>Update Pet</v-btn>

      <!-- Shows any error got from the server after submiting the form -->

      <div v-if="errorCreate" class="tw-my-3">
        <v-alert type="error"> {{ errorCreate.message }} </v-alert>
      </div>

      <div v-if="errorUpdatePet" class="tw-my-3">
        <v-alert type="error"> {{ errorUpdatePet.message }} </v-alert>
      </div>

    </v-form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { errorCreate, createPet } from '@/composables/CreateDelete';
import { errorUpdatePet, updatePet } from '@/composables/EditUpdate';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const props = defineProps({
  categories: {
    type: Array,
    default: []
  },
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

const route = useRoute();

const categories = ref(props.categories);
const status = ref('');
const name = ref('');
const tags = ref([]);
const currentTag = ref('');
const photoUrls = ref([]);
const currentUrl = ref('');
const category = ref(null);

// gives some seconds to load correctly the props and check if the route is under update operation, so it can load 
// the pet to update and fill the fields with the current information

setTimeout(() => {
  if (route.query.update) {
    const pet = props.pet;
    const categ = categories.value.find(categ => categ.id === pet.category) || '';

    name.value = pet.name;
    status.value = pet.status;
    tags.value = pet.tags;
    category.value = categ.title;
    photoUrls.value = pet.photoUrls;

  }
}, 500);

// enables the submit button only when all fields are filled

const invalid = computed(() => {
  if (category.value && name.value.length > 3 && photoUrls.value.length && tags.value.length && status.value) {
    return false
  }
  return true;
})

// handles the submit button and checks if it is a Create or Update operation

const handleCreate = async () => {
    const categ = categories.value.find(categ => categ.title === category.value) || '';
    let pet = {
        category: categ.id,
        name: name.value,
        photoUrls: photoUrls.value,
        tags: tags.value,
        status: status.value
    }
    if (route.query.update) {

       pet = { id: props.pet.id, ...pet };
       await updatePet(pet);
       if (!errorUpdatePet.value) router.push({ name: 'pet', params: { id: pet.id } });

    } else{
        const res = await createPet(pet);
        if (!errorCreate.value) {
            router.push({name: 'pet', params: { id: res.id }})
        } 
    }

}

// adds a tag to the tags array

const addTag = () => {
  if (!tags.value.includes(currentTag.value.toLowerCase())) {
    tags.value.push(currentTag.value.toLowerCase());
    currentTag.value = '';
  } else {
    currentTag.value = '';
  }
}

// removes selected tags from the tags array

const removeTag = (idx) => {
  tags.value.splice(idx, 1);
}

// adds a url to the photourls array 

const addUrl = () => {
  if (!photoUrls.value.includes(currentUrl.value)) {
    photoUrls.value.push(currentUrl.value);
    currentUrl.value = '';
  } else {
    currentUrl.value = '';
  }
}

// removes a url from the photourls array 


const removeURL = (idx) => {
  photoUrls.value.splice(idx, 1);
}

</script>
