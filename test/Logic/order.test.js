const {getOrder, deleteOrder, postOrder} = require('../../index.js');
const {postPet, deletePet} = require('../../helper/helper.js');
const {fakePetData, fakeOrderData, mockId, getPastDate, getNegativeQuantity, getFutureDate} = require('../../helper/fake.js');

//Create and Query an order
describe('create and query orders', ()=>{
    let pet; 
    let order;
    let pet1;
    let order1;
    let pet2;
    let order2;
    let pet3;
    let order3;
    
    //Setup
    beforeAll(async () =>  {
        pet = fakePetData();
        pet1 = fakePetData();
        pet2 = fakePetData();
        pet3 = fakePetData();
        order = fakeOrderData(pet.id);
        order1 = fakeOrderData(pet1.id);
        order2 = fakeOrderData(pet2.id);
        order3 = fakeOrderData(pet3.id);
        order1.shipDate = getPastDate();
        order2.quantity = getNegativeQuantity();
        order3.status = 'delivered';
        order3.shipDate = getFutureDate();
        await postPet(pet);
        await postPet(pet1);
        await postPet(pet2);
    });
    //Teardown
    afterAll(async () => {
        
        await deleteOrder(order.id);
        await deleteOrder(order1.id);
        await deleteOrder(order2.id);
        await deleteOrder(order3.id);
        await deletePet(pet.id);
        await deletePet(pet1.id);
        await deletePet(pet2.id);
        await deletePet(pet3.id);
    });

    //Test order creation
    test('createOrder', ()=>{
        expect.assertions(6);
        return postOrder(order)
        .then(res =>{
            expect(res.data.id).toBe(order.id)
            expect(res.data.petId).toBe(order.petId);
            expect(res.data.quantity).toBe(order.quantity);
            expect(new Date(res.data.shipDate)).toEqual(order.shipDate);
            expect(res.data.status).toBe(order.status);
            expect(res.data.complete).toBe(order.complete);
        })
    });

    //Test order querying
    test('queryOrder', () =>{       
        expect.assertions(6);
        return getOrder(order.id)
        .then(res =>{
            expect(res.data.id).toBe(order.id)
            expect(res.data.petId).toBe(order.petId);
            expect(res.data.quantity).toBe(order.quantity);
            expect(new Date(res.data.shipDate)).toEqual(order.shipDate);
            expect(res.data.status).toBe(order.status);
            expect(res.data.complete).toBe(order.complete);

        });
    });

    //Query an order that does not exist
    test('queryNonExistentOrder', ()=>{
     expect.hasAssertions(); 
     return getOrder(9876).then(res =>{
         expect(res.status).not.toBe(200);      
        }).catch(err =>{
            expect(err.response.data.message).toBe("Order not found");
            expect(err.response.status).toBe(404);
        });
    });

    test('postOrderWithPreviousShipDate', () =>{
        order1.shipDate = getPastDate();
        expect.assertions(1);
        return postOrder(order1)
        .then(res =>{
            expect(res.status).not.toBe(200);
        }).catch(err =>{
            if(err.response !== undefined){
                expect(err.response.status).toBe(400);
            }
            else{
                throw err;
            }
            
        })
        
    });

    test('postOrderWithNegativeQuantity', ()=>{
        expect.assertions(1);
        return postOrder(order2).then(res =>{
            expect(res.status).not.toBe(200);
        })
        .catch(err =>{
            if(err.response !== undefined){
                expect(err.response.status).toBe(400);
            }  
            else{
                throw err;
            }   
        });
    });

    test('postDeliveredOrderWithFutureShipDate', ()=>{
        expect.assertions(1);
        return postOrder(order3).then(res =>{
            expect(res.status).not.toBe(200);
        })
        .catch(err => {
            if(err.response !== undefined){
                expect(err.response.status).toBe(400);
            }
            else{
                throw err;
            }
        });
    });
});
       

//Delete an order
describe('Order deletion', () =>{
    let pet;
    let order;
    //Setup
    beforeAll(async () => {
        pet = fakePetData();
        order = fakeOrderData(pet.id);
        
        await postPet(pet);
        await postOrder(order);
    });
    //Teardown
    afterAll(async()=> {
        await deletePet(pet.id);
    });
    //Test that the order is deleted
    test('deleteOrder', ()=>{
        expect.assertions(1);
        return deleteOrder(order.id).then(res => {
            expect(res.data.code).toBe(200)
        }).catch((err)=>{
            throw err;
        })
    });

    //Test deleting an order that does not exist
    test('deleteNonExistentOrder', () =>{
        expect.assertions(2);
        return deleteOrder(1920).then(res => {
            expect(res.status).not.toBe(200);
        }).catch(err =>{
            if(err !== undefined){
                expect(err.response.data.message).toBe("Order Not Found");
                expect(err.response.status).toBe(404);
            }
            else{
                throw err;
            }
        });

    });
});

//Test orders with incorrect data (logic)
describe('Post order with pet that doesn\'t exists', () =>{
    //Data mocking
    let petId;
    let order;
    petId = mockId();
    order = fakeOrderData(petId);

    //Teardown
    afterAll(async() =>{
        deleteOrder(order.id);
    });
    
    //Post a purchase order for a pet that doesn't exist
    test('postOrderWithNonExistentPet', ()=>{
        expect.assertions(1);
        return postOrder(order).then(res =>{
            expect(res.status).not.toBe(200);
        })
        .catch((err)=>{
            if(err.response != undefined){
                expect(err.response.status).toBe(500);
            }
            else {
                throw err;
            }
        });
    });
});

describe('place an order for a pet that is already sold', () =>{
    let pet;
    let order;
    //SETUP
    beforeAll(async()=>{
        pet = fakePetData();
        pet.status = 'sold';
        order = fakeOrderData(pet.id);            
        postPet(pet);
    })
    //Teardown
    afterAll(async() =>{
        deletePet(pet.id);
        deleteOrder(order.id);
    })

    test('postOrderWithSoldPet', () =>{
        expect.assertions(1);
        return postOrder(order).then(res =>{
            expect(res.status).not.toBe(200);
        }).catch(err =>{
            if(err.response != undefined){
                expect(err.response.status).toBe(400);
            }
            else {
                throw err;
            }
        })
    })
});



