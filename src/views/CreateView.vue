<template>
  <div class="tw-flex w-full tw-flex-col tw-items-center tw-my-[50px]">
    <CreatePet v-if="categories && !edit" :categories="categories" :pet="pet"/>
    <EditPet v-else-if="pet && edit" :pet="pet"/>
    <div v-else-if="errorCategories" class="tw-text-2xl tw-text-[red] tw-font-medium">
      We are sorry, something went wrong.
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
import { ref } from 'vue';
import CreatePet from '@/components/CreatePet.vue';
import EditPet from '@/components/EditPet.vue';
import { errorCategories, getCategories } from '@/composables/Get';
import { errorSinglePet, getSinglePet } from '@/composables/Get';
import { useRoute } from 'vue-router';

const route = useRoute();
const categories = ref(null);
const pet = ref(null);
const edit = ref(null);
const update = ref(null);

// get categories to display in the select field in the form component.

getCategories()
  .then(data => categories.value = data.map(c => { return { title: c.name.toUpperCase(), id: c.id } }))
  .catch(err => console.log(err));

// checks what compoenet to show cheking the url to see if it is a create, update, or edit operation.

if (route.query.edit || route.query.update) {
  edit.value = JSON.parse(route.query.edit || 'false');
  update.value = JSON.parse(route.query.update || 'false');

  getSinglePet(route.params.id)
    .then(data => pet.value = data)
    .catch(err => console.log(err))
}
</script>
