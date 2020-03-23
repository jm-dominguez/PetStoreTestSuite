const {getOrder, deleteOrder, postOrder} = require('../../index.js');
const {postPet, deletePet} = require('../../helper/helper.js');
const {fakePetData, fakeOrderData, getPastDate, getNegativeQuantity, getAlphanumericValue} = require('../../helper/fake.js')


describe('negative tests for the order services', () =>{
    let pet1; 
    let pet2; 
    let pet3;
    let order1;
    let order2;
    let order3;
    let invalidId = getAlphanumericValue(10);
    //Setup
    beforeAll(async () => {  
        pet1 = fakePetData();
        pet2 = fakePetData();
        pet3 = fakePetData();
        order1 = fakeOrderData(pet1.id);
        order1.shipDate = getPastDate();
        order2 = fakeOrderData(pet2.id);
        order2.quantity = getNegativeQuantity;
        order3 = fakeOrderData(pet3.id);
        order3.id = invalidId;

        await postPet(pet1);
        await postPet(pet2);
        await postPet(pet3);
    })
    //Teardown
    afterAll(async () => {
        await deletePet(pet1.id);
        await deletePet(pet2.id);
        await deletePet(pet3.id);
        await deleteOrder(order1.id);
        await deleteOrder(order2.id);
        await deleteOrder(order3.id);
    })

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
        
    })

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
    })

    test('postOrderWithInvalidId', () =>{
        expect.assertions(1);
        return postOrder(order3).then(res =>{
            expect(res.status).not.toBe(200);
        }).catch(err =>{
            if(err.response !== undefined){
                expect(err.response.status).toBe(400);
            }
            else{
                throw err;
            }
        });
    });

    test('getOrderWithInvalidId', () =>{
        expect.assertions(1);
        return getOrder(invalidId).then(res =>{
            expect(res.status).not.toBe(200);
        })
        .catch(err =>{
            if(err.response !== undefined){
                expect(err.response.status).toBe(400)
                console.log(err.response.message);
            }
        })
    })
});