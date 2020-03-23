const faker = require('faker');

// Fake data for pet requests
const fakePetData = () =>{
    let pet = {
        id: faker.random.number({min:200, max:900}),
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
// Get a past date
const getPastDate = (years) =>{
    let date = faker.date.past(years);
    return date;
}
//Get a future date
const getFutureDate = (years) =>{
    let date = faker.date.future(years);
    return date;
}
// Get a negative value
const getNegativeQuantity = () =>{
    let negative = faker.random.number({max: -1});
    return negative;
}
// Get an alphanumeric random string
const getAlphanumericValue = (lentgh) =>{
    let alpha = faker.random.alphaNumeric(10);
    return alpha;
}
// Get an id
const mockId = () =>{
    let id = faker.random.number({min:1, max:500});
    return id;
}

// Get string
const getRandomString = () =>{
    let random = faker.random.word();
    return random;
}

exports.fakeOrderData = fakeOrderData;
exports.fakePetData = fakePetData;
exports.getPastDate = getPastDate;
exports.getFutureDate = getFutureDate;
exports.getNegativeQuantity = getNegativeQuantity;
exports.getAlphanumericValue = getAlphanumericValue;
exports.mockId = mockId;
exports.getRandomString = getRandomString;