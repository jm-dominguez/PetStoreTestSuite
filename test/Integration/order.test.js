const {getOrder, deleteOrder, postOrder} = require('../../index.js');
const {postPet, deletePet} = require('../../helper/helper.js');
const {fakePetData, fakeOrderData, mockId} = require('../../helper/fake.js');
const {shouldFakeData, getIntegrationOrderConfig} = require('../../helper/config.js');

let fakeData = shouldFakeData();
let config;
if(fakeData === false){
    config = getIntegrationOrderConfig();
};

//Create and Query an order
describe('create order logic', ()=>{
    let pet; 
    let order; 
    //Setup
    beforeAll(async () =>  {
        if(fakeData === true){
            pet = fakePetData();
            order = fakeOrderData(pet.id);
        }
        else {
            let data = config.createandqueryorder;
            pet = data.pet;
            order = data.order;
            let tempDate = order.shipDate;
            order.shipDate = new Date(tempDate);
        }
        await postPet(pet);
    });
    //Teardown
    afterAll(async () => {
        await deletePet(pet.id);
        await deleteOrder(order.id);
        pet = null;
        order = null;
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
});
       

//Delete an order
describe('Order deletion', () =>{
    let pet;
    let order;
    //Setup
    beforeAll(async () => {
        if(fakeData === true){
            pet = fakePetData();
            order = fakeOrderData(pet.id);
        }
        else{
            let data = config.orderdeletion;
            pet = data.pet;
            order = data.order;
            let tempDate = order.shipDate;
            order.shipDate = new Date(tempDate);
        }
        await postPet(pet);
        await postOrder(order);
    });
    //Teardown
    afterAll(async()=> {
        await deletePet(pet.id);
        pet = null;
        order = null;
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
    if (fakeData === true){
        petId = mockId();
        order = fakeOrderData(petId);
    }
    else{
        let data = config.orderwithfaultydata;
        petId = data.petId;
        order = data.id;
    }
    //Teardown
    afterAll(async() =>{
        deleteOrder(order.id);
        petId = null;
        order = null;
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


describe('place an order for a pet that is already sold', () =>{
    let pet;
    let order;
    //SETUP
    beforeAll(async()=>{
        if (fakeData === true){
            pet = fakePetData();
            pet.status = 'sold';
            order = fakeOrderData(pet.id);
        }
        else{
            let data = config.orderwithsoldpet;
            pet = data.pet;
            order = data.order;
        }         
        postPet(pet);
    })
    //Teardown
    afterAll(async() =>{
        deletePet(pet.id);
        deleteOrder(order.id);
        pet = null;
        order = null;
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
});



