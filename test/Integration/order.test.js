const {getOrder, deleteOrder, postOrder} = require('../../index.js');
const {postPet, deletePet} = require('../../helper/helper.js');
const faker = require('faker');

describe('create and query an order for a pet ', ()=>{
    //Data mocking
    let name = faker.name.firstName();
    let date = new Date();
    let quantity = faker.random.number();
    let complete = faker.random.boolean();
    //Setup
    beforeAll(async () =>  await postPet(255,name, [], "available"));
    //Teardown
    afterAll(async () => {
        await deletePet(255);
        await deleteOrder(800);
    });

    //Tests
    test('Post a buy order for a pet', ()=>{
        expect.assertions(5);
        return postOrder(800, 255, quantity, date, "placed",complete)
        .then(res =>{
            let id = res.id;
            let quantity2 = res.quantity;
            let date2 = res.shipDate;
            let status = res.status;
            let complete2 = res.complete;

            expect(id).toBe(800);
            expect(quantity2).toBe(quantity);
            expect(new Date(date2)).toEqual(date);
            expect(status).toBe("placed");
            expect(complete2).toBe(complete);
        })
    });

    test('Get order for a pet', () =>{       
        expect.assertions(5);
        return getOrder(800)
        .then(res =>{
            let id = res.id;
            let quantity2 = res.quantity;
            let date2 = res.shipDate;
            let status = res.status;
            let complete2 = res.complete;

            expect(id).toBe(800);
            expect(quantity2).toBe(quantity);
            expect(new Date(date2)).toEqual(date);
            expect(status).toBe("placed");
            expect(complete2).toBe(complete);

        });
    });

    test('Get an order that does not exists', ()=>{
     expect.assertions(2); 
     return getOrder(9876).then(res =>{          
        }).catch(err =>{
            expect(err.response.data.message).toBe("Order not found");
            expect(err.response.status).toBe(404);
        })
    })   
});

describe('Order deletion', () =>{
    //Data mocking
    let name = faker.name.firstName();
    let date = new Date();
    let quantity = faker.random.number();
    //Setup
    beforeAll(async () => {
        await postPet(255,name, [], "available");
        await postOrder(555, 255, quantity, date, "placed",true);
    });
    //Teardown
    afterAll(async()=> {
        await deletePet(255);
    });
    //Test
    test('Delete order', ()=>{
        expect.assertions(1);
        return deleteOrder(555).then(res => {
            expect(res.code).toBe(200);
        })
    });

    test('Delete order that does not exist', () =>{
        expect.assertions(2);
        return deleteOrder(1920).then().catch(err =>{
            expect(err.response.data.message).toBe("Order Not Found");
            expect(err.response.status).toBe(404);
        });

    });
});

describe('Post orders with faulty data', () =>{
    //Data mocking
    let orderId = 784
    let date = new Date();
    let quantity = faker.random.number();
    let petId = 889;
    let complete = faker.random.boolean();
    //Teardown
    afterAll(async() =>{
        deleteOrder(784);
    });
    
    //Test
    test('Post order with a pet that does not exist', ()=>{
        expect.assertions(1);
        return postOrder(orderId, petId, quantity, date, "pending", complete).then()
        .catch((err)=>{
            expect(err.response.status).toBe(500);
        });
    });
});



