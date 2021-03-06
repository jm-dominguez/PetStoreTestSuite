const axios = require('axios');
//Get the base url from the properties file.
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('./config.properties');
const BASE_URL = properties.get('BASE_URL');

//Functions to acces the API

//Get inventory
const getInventory = () =>{
    return axios.get(BASE_URL + 'store/inventory')
                .then(res =>{
                    return res
                })
                .catch(err =>{
                    throw(err);
                });
};
// Get order
const getOrder = (orderId)=>{
    return axios.get(BASE_URL + 'store/order/' + orderId)
                .then(res =>{
                    return res
                })
                .catch(err =>{
                    throw err;
                });
};
// Delete order
const deleteOrder = (orderId) =>{
    return axios.delete(BASE_URL + 'store/order/' + orderId)
                .then(res =>{
                    return res;
                })
                .catch(err=>{
                    throw err;
                });
};
// Create order
const postOrder = (order) =>{
    return axios.post(BASE_URL + 'store/order', order)
                .then(res =>{
                    return res
                })
                .catch(err =>{
                    throw err;
                });
};

exports.getInventory = getInventory;
exports.getOrder = getOrder;
exports.deleteOrder = deleteOrder;
exports.postOrder = postOrder;