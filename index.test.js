const {getInventory, getOrder, deleteOrder, postOrder} = require('./index.js');
const {postPet, deletePet, updatePet, updatePetWithForm} = require('./helper/helper.js');
const faker = require('faker');

//Get Inventory
test('getInventory data types are correct', ()=>{
    expect.assertions(3);
    return getInventory().then((res)=>{
    
        let sold = res.sold;
        let pending = res.pending;
        let available = res.available;

        expect(typeof sold).toBe("number");
        expect(typeof pending).toBe("number");
        expect(typeof available).toBe("number");
    })
});

describe('create and query an order for a pet ', ()=>{
    //Data mocking
    let name = faker.name.firstName();
    let date = new Date();
    let quantity = faker.random.number();
    //Setup
    beforeAll(async () =>  await postPet(255,name, [], "available"));
    //Teardown
    afterAll(async () => {
        await deletePet(petId);
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





