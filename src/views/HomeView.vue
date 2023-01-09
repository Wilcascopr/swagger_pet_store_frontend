<template>
    <div class="tw-flex tw-flex-col tw-mx-[15px] tw-items-center md:tw-mx-[45px] tw-my-[50px]">
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
import SinglePet from '@/components/SinglePet.vue';
import { errorStatusPet, getByStatus } from '@/composables/Get';
import { ref } from 'vue';

const pets = ref([]);
const nopets = ref(null);

// gets all pets from the server with load effect

setTimeout(() => {
    getByStatus()
        .then(data => {
            if (Array.isArray(data)) { 
                pets.value = data
            } else {
                nopets.value = data
            }
        })
        .catch(error => console.log(error)) 
}, 1000);




</script>
