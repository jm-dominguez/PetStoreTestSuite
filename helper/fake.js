const faker = require('faker');

// Fake data for pet requests
const fakePetData = () =>{
    let pet = {
        id: faker.random.number({min:50000, max:55000}),
        name: faker.name.firstName(),
        photosUrls: [],
        status: "available"
    }
    return pet;
}

// Fake data for order requests
const fakeOrderData = (pPetId) =>{
    let order = {
        id: faker.random.number({min:10, max:100}),
        petId: pPetId,
        quantity: faker.random.number({min:1}),
        shipDate: new Date(),
        status: "placed",
        complete: faker.random.boolean()
    }

    return order;
}

const getPastDate = () =>{
    return faker.date.past();
}

const getNegativeQuantity = () =>{
    return faker.random.number({max: -1});
}

const getAlphanumericValue = (lentgh) =>{
    return faker.random.alphaNumeric(length);
}

const mockId = () =>{
    return faker.random.number({min:1, max:500});
}

exports.fakeOrderData = fakeOrderData;
exports.fakePetData = fakePetData;
exports.getPastDate = getPastDate;
exports.getNegativeQuantity = getNegativeQuantity;
exports.getAlphanumericValue = getAlphanumericValue;
exports.mockId = mockId;