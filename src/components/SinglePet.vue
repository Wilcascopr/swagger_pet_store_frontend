<template>

  <!-- flash card from a pet showing basic information and the first picture in the photosurl-->

  <div>
    <v-card
    class="mx-auto"
    max-width="344">
      <div v-if="pet.photoUrls.length" class="tw-flex">
          <v-img
            :src="pet.photoUrls[0]"
            height="200px"
            width="200px"
          ></v-img>
      </div>
      
      <v-card-title>
        {{ pet.name.toUpperCase() }}
      </v-card-title>

      <v-card-subtitle> {{ pet.status.toUpperCase() }} </v-card-subtitle>

      <v-btn class="tw-m-2"
      rounded="pill"
      color="primary"
      v-for="tag in pet.tags" :key="tag">
          {{tag}}
      </v-btn>

      <v-card-actions>
        <v-btn
          color="orange-lighten-2"
          variant="text"
        >

          <!-- redirects to singlepet view -->

          <router-link :to="{ name: 'pet', params: { id: pet.id }}">
            View
          </router-link>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

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
const pet = ref(props.pet);


</script>
