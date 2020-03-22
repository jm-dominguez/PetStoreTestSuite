const {getOrder, deleteOrder, postOrder} = require('../../index.js');
const {postPet, deletePet} = require('../../helper/helper.js');
const faker = require('faker');

describe('negative tests for the order services', () =>{
    //Data mocking
    let name = faker.name.firstName();
    let quantity = faker.random.number();
    let complete = faker.random.boolean();
    let date = faker.date.past();
    //Setup
    beforeAll(async () => {  
        await postPet(255,name, [], "available");
        await postPet(256, name, [], "available");
    });
    //Teardown
    afterAll(async () => {
        await deletePet(255);
        await deletePet(256);
        await deleteOrder(555);
        await deleteOrder(556);
    });

    test('create an order with a past date', () =>{
        expect.assertions(1);
        return postOrder(555, 255, quantity, date, "pending", complete)
        .then().catch(err =>{
            expect(err.response.status).toBe(500);
        })
        
    })
    let wrongQuantity = faker.random.number({max:-1});
    test('create an order with a negative quantity', ()=>{
        expect.assertions(1);
        return postOrder(556, 256, wrongQuantity, new Date(), "pending", complete).then()
        .catch(err =>{
            expect(err.response.status).toBe(500);
        });
    })
});