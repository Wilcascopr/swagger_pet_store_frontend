<template>
    <div>
        <v-form @submit.prevent class="tw-w-full sm:tw-w-[75%]  lg:tw-w-[55%]">

            <v-text-field label="Name" v-model="name"></v-text-field>

            <v-radio-group inline v-model="status">
            <v-radio label="Available" value="available"></v-radio>
            <v-radio label="Pending" value="pending"></v-radio>
            <v-radio label="Sold" value="sold"></v-radio>
            </v-radio-group>

            <v-btn @click="handleEdit" :disabled="invalid">
                Save Changes
            </v-btn>

        </v-form>
        <!-- shows errors after submitted the form-->
        <div v-if="errorEditPet" class="tw-my-3">
            <v-alert type="error"> {{ errorEditPet.message }} </v-alert>
        </div>
    </div>   
</template>

<script setup>
import { errorEditPet, editPet } from '@/composables/EditUpdate';
import { ref, computed } from 'vue';
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
})

const name = ref('');
const status = ref('');

name.value = props.pet.name.toUpperCase();
status.value = props.pet.status;

// enables the submit button when there are at least one field filled

const invalid = computed(() => {
    if (name.value.length < 3 && status.value.length === 0) {
        return true;
    }
    return false;
})

// handles the edit req.

const handleEdit = async () => {
    await editPet(props.pet.id, {
        name: name.value,
        status: status.value
    })
    if (!errorEditPet.value) router.push({ name: 'pet', params: { id: props.pet.id } });
}

</script>
