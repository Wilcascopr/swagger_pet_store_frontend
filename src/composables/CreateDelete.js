import axios from '@/axios/axios.js'
import { ref } from 'vue';

const errorCreate = ref(null);
const errorDelete = ref(null);

//handles the create and delete requests to the server with the respective function, returns errors in case there are

const createPet = async (pet) => {

    errorCreate.value = null;

    try {

        const response = await axios.post('/pet', pet);
        return response.data;

    } catch(error) {
        if (error.response) {
            errorCreate.value = error.response.data;
        } else {
            errorCreate.value = error;
        }
        
    }


}


const deletePet = async (id) => {

    errorDelete.value = null;

    try {

        const response = await axios.delete(`/pet/${id}`);
        return response.data;

    } catch(error) {
        if (error.response) {
            errorDelete.value = error.response.data;
        } else {
            errorDelete.value = error;
        }
        
    }
}


export { errorCreate, errorDelete, deletePet, createPet }