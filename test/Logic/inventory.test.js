const {getInventory} = require('../../index.js');
const {postPet, deletePet, updatePet, updatePetWithForm} = require('../../helper/helper.js');
const {fakePetData, getRandomString} = require('../../helper/fake.js');

//Get Inventory
test('getInventoryValidation', ()=>{
    //Test
    let numberOfProperties;
    beforeAll(async()=>{
        await getInventory().then(res => {
            numberOfProperties = Object.keys(res.data).length;           
        })
    })

    expect.assertions(numberOfProperties);
    return getInventory().then((res)=>{
        Object.values(res.data).forEach((v, i)=>{
            expect(typeof v).toBe("number");
        })
    }).catch(err =>{
        throw err;
    });
});

describe('changeInventoryValidation', ()=>{
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
        await deletePet(pet1.id);
        await deletePet(pet2.id);
        await deletePet(pet3.id);
        await deletePet(pet4.id);
    })

    test('InventoryNumbersIncrease', async ()=>{
        expect.assertions(3);
        let response = await getInventory();
        let data1 = response.data;
        expect(data1.sold).toBe(soldInitial + 1);
        expect(data1.pending).toBe(pendingInitial + 2);
        expect(data1.available).toBe(availableInitial + 1)
    });
});

describe('add a new status to the inventory', ()=>{
    let newStatus = getRandomString();
    let pet = fakePetData();
    pet.status = newStatus;

    beforeAll(async()=>{
        await postPet(pet);
    })

    afterAll(async()=>{
        await deletePet(pet.id);
    })

    test('addInventoryStatus', ()=>{
        expect.assertions(1);
        return getInventory().then(res =>{
            let data1 = res.data;
            expect(data1[newStatus]).toBe(1);
        });
    });
});

describe('check inventory change after pet update', ()=>{
    let pet = fakePetData();
    let initialStatus = getRandomString();
    pet.status = initialStatus;
    let finalStatus = getRandomString();
    let initialStatusCount;
    let finalStatusCount;
    beforeAll(async () =>{
        await postPet(pet);
        await getInventory().then(res =>{
            initialStatusCount = res.data[initialStatus];
            if(res.data[finalStatus] !== undefined){
                finalStatusCount = res.data[finalStatus]
            }
            else{
                finalStatusCount = 0;
            }
        })
    });

    test('validateInventoryWithPetChange', async ()=>{
        expect.assertions(2);
        await updatePetWithForm(pet.id, pet.name, finalStatus);
        let response = await getInventory();
        let inventory = response.data;
        let initialStatusEndCount;
        if(inventory[initialStatus] === undefined){
            initialStatusEndCount = 0;
        }
        else{
            initialStatusEndCount = inventory[initialStatus];
        }
        expect(initialStatusEndCount).toBe(initialStatusCount - 1);
        expect(inventory[finalStatus]).toBe(finalStatusCount + 1);
    })

    afterAll(async()=>{
        deletePet(pet.id);
    })

});