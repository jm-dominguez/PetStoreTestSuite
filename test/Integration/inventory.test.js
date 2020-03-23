const {getInventory} = require('../../index.js');
const {postPet, deletePet, updatePet, updatePetWithForm} = require('../../helper/helper.js');
const {fakePetData} = require('../../helper/fake.js');

// let fakeData = shouldFakeData();
// let config;
// if(fakeData === false){
//     config = getIntegrationOrderConfig();
// };

//Get Inventory
test('getInventory data types are correct', ()=>{
    //Test
    expect.assertions(3);
    return getInventory().then((res)=>{
        Object.values(res.data).forEach((v, i)=>{
            expect(typeof v).toBe("number");
        })
    }).catch(err =>{
        console.log(err);
    });
});

describe('Test inventory data changes', ()=>{
    let soldInitial;
    let pendingInitial;
    let availableInitial;
    let pet1;
    let pet2;
    let pet3;
    let pet4;

    beforeAll(async()=>{
        let response = await getInventory();
        let data = response.data;
        if(data.sold !== undefined){
            soldInitial = data.sold;
        }
        else{
            soldInitial = 0;
        }
        if(data.pending !== undefined){
            pendingInitial = data.pending;
        }
        else {
            pendingInitial = 0;
        }
        if(data.available !== undefined){
            availableInitial = data.available;
        }
        else{
            availableInitial = 0;
        }

        pet1 = fakePetData();
        pet1.status = "available";
        pet2 = fakePetData();
        pet2.status = "pending";
        pet3 = fakePetData();
        pet3.status = "pending";
        pet4 = fakePetData();
        pet4.status = "sold";

        await postPet(pet1);
        await postPet(pet2);
        await postPet(pet3);
        await postPet(pet4);
    });

    afterAll(async()=>{
        console.log('He sido llamado');
        await deletePet(pet1.id);
        await deletePet(pet2.id);
        await deletePet(pet3.id);
        await deletePet(pet4.id);
    })

    test('InventoryNumbersIncrease', async ()=>{
        expect.assertions(3);
        let response = await getInventory();
        let data = response.data;
        expect(data.available).toBe(availableInitial + 1)
        expect(data.sold).toBe(soldInitial + 1);
        expect(data.pending).toBe(pendingInitial + 2);
        console.log('TEST FINALIZADO')
    });
});