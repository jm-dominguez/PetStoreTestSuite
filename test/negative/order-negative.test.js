const {getOrder, deleteOrder, postOrder} = require('../../index.js');
const {postPet, deletePet} = require('../../helper/helper.js');
const {fakePetData, fakeOrderData, getAlphanumericValue, getRandomString} = require('../../helper/fake.js')


describe('negative tests for the order services', () =>{  
    let pet3;
    let order3;
    let invalidId = getAlphanumericValue(10);
    //Setup
    beforeAll(async () => {  
        pet3 = fakePetData();
        order3 = fakeOrderData(pet3.id);
        order3.id = invalidId;

        await postPet(pet3);
    })
    //Teardown
    afterAll(async () => {
        await deletePet(pet3.id);
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
        })
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
        })
    })
});