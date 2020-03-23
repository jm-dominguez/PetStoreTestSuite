// Required modules
const axios = require('axios');
//Get the base url from the properties file.
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('./config.properties');
const BASE_URL = properties.get('BASE_URL');
const qs = require('qs');

//Helper functions for accesing services that are not tested in this project.

//Post a pet
const postPet = async (pet) =>{
    return axios.post(BASE_URL + 'pet/',pet)
                .then(res =>{
                    return res.data
                })
                .catch(err=>{
                    console.log(err);
                })

};

//Delete a pet
const deletePet = async (petId)=>{
    //Function for deleting a pet
    return axios.delete(BASE_URL + 'pet/' + petId)
                .then(res =>{
                    return res.data;
                })
                .catch(err=>{
                    throw err;
                })
};

//Update a pet
const updatePet = async (pet)=>{
    //Function for updating a pet
    return axios.put(BASE_URL + 'pet/',pet)
                .then(res =>{
                    return res.data
                })
                .catch(err=>{
                    console.log(err);
                })
};

// Update a pet using forms
const updatePetWithForm = (pId, pName, pStatus)=>{
    return axios({
        method: 'post',
        url: BASE_URL + 'pet/' + pId,
        data: qs.stringify({
          name: pName,
          status: pStatus
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
      })
    .then(res =>{
        return res.data;
    })
    .catch(err =>{
        console.log(err);
    });
}


exports.postPet = postPet;
exports.deletePet = deletePet;
exports.updatePet = updatePet;
exports.updatePetWithForm = updatePetWithForm;