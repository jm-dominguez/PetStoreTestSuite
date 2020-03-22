const {getOrder, deleteOrder, postOrder} = require('../../index.js');
const {postPet, deletePet} = require('../../helper/helper.js');
const faker = require('faker');

describe('create and query an order for a pet ', ()=>{
    //Data mocking
    let name = faker.name.firstName();
    let date = new Date();
    let quantity = faker.random.number();
    //Setup
    beforeAll(async () =>  await postPet(255,name, [], "available"));
    //Teardown
    afterAll(async () => {
        await deletePet(255);
        await deleteOrder(555);
    });

    //Tests
    test('Post a buy order for a pet', ()=>{
        expect.assertions(5);
        return postOrder(555, 255, quantity, date, "placed",true)
        .then(res =>{
            let id = res.id;
            let quantity2 = res.quantity;
            let date2 = res.shipDate;
            let status = res.status;
            let complete = res.complete;

            expect(id).toBe(555);
            expect(quantity2).toBe(quantity);
            expect(new Date(date2)).toEqual(date);
            expect(status).toBe("placed");
            expect(complete).toBe(true);
        })
    });

    test('Get order for a pet', () =>{       
        expect.assertions(5);
        return getOrder(555)
        .then(res =>{
            let id = res.id;
            let quantity2 = res.quantity;
            let date2 = res.shipDate;
            let status = res.status;
            let complete = res.complete;

            expect(id).toBe(555);
            expect(quantity2).toBe(quantity);
            expect(new Date(date2)).toEqual(date);
            expect(status).toBe("placed");
            expect(complete).toBe(true);

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
            console.log(err.response.data.message);
            console.log(err.response.status);
            expect(err.response.data.message).toBe("Order Not Found");
            expect(err.response.status).toBe(404);
        });

    });
});

describe('Inventory updates', () =>{

});



