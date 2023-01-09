<template>
  <div class="tw-w-full tw-flex tw-justify-center tw-my-[50px]">
    <div v-if="pet">
      <PetFull :pet="pet"/>
    </div>
    <div v-else-if="errorSinglePet" class="tw-text-2xl tw-text-[red] tw-font-medium">
      {{ errorSinglePet.message }}
    </div>
    <div v-else>
      <v-progress-circular
      :size="70"
      :width="7"
      color="dark-blue"
      indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script setup>
import PetFull from '@/components/PetFull.vue';
import { errorSinglePet, getSinglePet } from '@/composables/Get';
import { useRoute } from 'vue-router';
import { ref } from 'vue';


const route = useRoute();
const pet = ref(null);

// gets the pet with the specified

setTimeout(() => {
  getSinglePet(route.params.id)
  .then(data => pet.value = data)
  .catch(err => error.value = err)
}, 1000);




</script>
