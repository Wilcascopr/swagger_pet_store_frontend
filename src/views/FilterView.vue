<template>
  <div class="tw-flex tw-flex-col tw-items-center">
    <div class="tw-flex  tw-gap-5 tw-my-[50px] tw-mx-[15px] md:tw-mx-[80px]">
      <v-switch
        v-model="avail"
        color="primary"
        label="Available"
        value="available"
      ></v-switch>
      <v-switch
        v-model="pending"
        color="primary"
        label="Pending"
        value="pending"
      ></v-switch>
      <v-switch
        v-model="sold"
        color="primary"
        label="Sold"
        value="sold"
      ></v-switch>
      <v-btn @click="filter"
      :disabled="validFilter" >Filter</v-btn>
    </div>
    <div v-if="pets.length" class="tw-flex tw-flex-col sm:tw-grid sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-[15px]">
        <div v-for="pet in pets" :key="pet.id">
            <SinglePet :pet="pet" />
        </div>
    </div>
    <h2 v-else-if="errorStatusPet" class="tw-text-2xl tw-text-[red] tw-font-medium">
            {{ errorStatusPet.message }}
    </h2>
    <h2 v-else-if="nopets" class="tw-text-2xl">
        {{ nopets.message }}
    </h2>
  </div>
</template>

<script setup>
import SinglePet from '@/components/SinglePet.vue';
import { ref, computed } from 'vue';
import { errorStatusPet, getByStatus } from '@/composables/Get';

const pending = ref(false);
const sold = ref(false);
const avail = ref(false);
const nopets = ref(null);

const pets = ref([]);

// Enables the filter button only when there is at least one filter applied

const validFilter = computed(() => pending.value === false && sold.value === false && avail.value === false)

// Checks what filters are on to make the request to the api with the applied filters


const filter = async () => {

  pets.value = [];

  const criteria = pending.value && sold.value && avail.value ? null :
    pending.value && sold.value ? `${pending.value},${sold.value}` :
      pending.value && avail.value ? `${pending.value},${avail.value}` :
        avail.value && sold.value ? `${avail.value},${sold.value}` :
          avail.value ? avail.value : 
            pending.value ? pending.value : sold.value;


  const response = await getByStatus(criteria)

  // checks if got a message back or the array of pets

  if (!errorStatusPet.value) {
    if (Array.isArray(response)) { 
      pets.value = response
    } else {
      nopets.value = response
    }
  }

}

</script>
