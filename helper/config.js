const fs = require("fs");
const config = fs.readFileSync("./config/test-config.json");
const jsonConfig = JSON.parse(config);
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('./config.properties');
const fakeData = properties.get('FAKE_DATA');

const shouldFakeData = ()=>{
    return fakeData;
}

const getIntegrationOrderConfig = () =>{
    let config = jsonConfig.integration.order;
    return config;
}

const getIntegrationInventoryConfig = () =>{
    let config = jsonConfig.integration.inventory;
    return
}


exports.shouldFakeData = shouldFakeData;
exports.getIntegrationOrderConfig = getIntegrationOrderConfig;
exports.getIntegrationInventoryConfig = getIntegrationInventoryConfig;
