import axios from '@/axios/axios.js'
import { ref } from 'vue';

const errorEditPet = ref(null);
const errorUpdatePet = ref(null);

//handles the edit and update requests to the server with the respective function, returns errors in case there are


const editPet = async (id, petEdited) => {

    errorEditPet.value = null;

    try {

        const response = await axios.post(`/pet/${id}`, petEdited);
        return response.data;

    } catch(error) {

        if (error.response) {
            errorEditPet.value = error.response.data;
        } else {
            errorEditPet.value = error; 
        }
        
    }


}


const updatePet = async (pet) => {

    errorUpdatePet.value = null;

    try {

        const response = await axios.put(`/pet`, pet);
        return response.data;

    } catch(error) {

        if (error.response) {
            errorUpdatePet.value = error.response.data;
        } else {
            errorUpdatePet.value = error; 
        }
        
    }
}


export { errorEditPet, errorUpdatePet, updatePet, editPet }