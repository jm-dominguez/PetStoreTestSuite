const axios = require('axios');
//Get the base url from the properties file.
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('./config.properties');
const BASE_URL = properties.get('BASE_URL');
//Functions to acces the API
const getInventory = () =>{
    return axios.get(BASE_URL + 'store/inventory')
                .then(res =>{
                    return res.data
                })
                .catch(err =>{
                    console.log(err);
                })
}

const getOrder = (orderId)=>{
    return axios.get(BASE_URL + 'store/order/' + orderId)
                .then(res =>{
                    return res.data;
                })
                .catch(err =>{
                    throw err;
                });
}

const deleteOrder = (orderId) =>{
    return axios.delete(BASE_URL + 'store/order/' + orderId)
                .then(res =>{
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

const postOrder = (pId,pPetId, pQuantity, pShipDate, pStatus, pComplete) =>{
    let order = {
        id: pId,
        petId: pPetId,
        quantity: pQuantity,
        shipDate: pShipDate,
        status: pStatus,
        complete: pComplete
    }
    return axios.post(BASE_URL + 'store/order', order)
                .then(res =>{
                    return res.data
                })
                .catch(err =>{
                    console.log(err.response);
                })
}

exports.getInventory = getInventory;
exports.getOrder = getOrder;
exports.deleteOrder = deleteOrder;
exports.postOrder = postOrder;