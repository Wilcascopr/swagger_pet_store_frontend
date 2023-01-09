import axios from '@/axios/axios.js'
import { ref } from 'vue';

const errorSinglePet = ref(null);
const errorStatusPet = ref(null);
const errorCategories = ref(null);

//handles the get requests to the server with the respective function, returns errors in case there are


const getSinglePet = async (id) => {

    errorSinglePet.value = null;

    try {

        const response = await axios.get(`/pet/${id}`);
        return response.data;

    } catch(error) {

        if (error.response) {
            errorSinglePet.value = error.response.data;
        } else {
            errorSinglePet.value = error
        }
        
    }


}


const getByStatus = async (status) => {

    errorStatusPet.value = null;

    if (!status) status = 'sold,available,pending';

    try {

        const response = await axios.get(`/pet/findByStatus?status=${status}`);
        return response.data;

    } catch(error) {

        if (error.response) {
            errorStatusPet.value = error.response.data;
        } else {
            errorStatusPet.value = error
        }
        
    }
}

const getCategories = async () => {

    errorCategories.value = null;

    try {

        const response = await axios.get('/categories');
        return response.data;

    } catch(error) {
        if (error.response) {
            errorCategories.value = error.response.data;
        } else {
            errorCategories.value = error
        }
        
    }


}

export { errorSinglePet, errorStatusPet, errorCategories, getSinglePet, getByStatus, getCategories }