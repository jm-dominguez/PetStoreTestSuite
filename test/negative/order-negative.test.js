const {getOrder, deleteOrder, postOrder} = require('../../index.js');
const {postPet, deletePet} = require('../../helper/helper.js');
const {fakePetData, fakeOrderData, getAlphanumericValue} = require('../../helper/fake.js');


describe('negative tests for the order services', () =>{  
    let pet3;
    let order3;
    let invalidId = getAlphanumericValue(10);

    let pet4;
    let order4;
    //Setup
    beforeAll(async () => {  
        pet3 = fakePetData();
        order3 = fakeOrderData(pet3.id);
        order3.id = invalidId;

        pet4 = fakePetData();
        order4 = fakeOrderData(pet4.id);
        order4.quantity = 500000000000000000000000000000000000000000000000000;

        await postPet(pet3);
        await postPet(pet4);
    })
    //Teardown
    afterAll(async () => {
        await deletePet(pet3.id);
        await deletePet(pet4.id);
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
                expect(err.response.status).toBe(400);
            }
        });
    })
    test('deleteOrderWithInvalidId', () =>{
        expect.assertions(1);
        return deleteOrder(invalidId).then(res =>{
            expect(res.status).not.toBe(200);
        })
        .catch(err =>{
            if(err.response !== undefined){
                expect(err.response.status).toBe(400);
            }
        });
    });

    test('createOrderWithInvalidQuantity', ()=>{
        expect.assertions(1);
        return postOrder(order4).then(res =>{
            expect(res.status).not.toBe(200);
        })
        .catch(err =>{
            expect(err.response.status).toBe(400);
        });
    });
});