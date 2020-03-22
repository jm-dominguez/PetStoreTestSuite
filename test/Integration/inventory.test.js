const {getInventory} = require('../../index.js');
const {postPet, deletePet, updatePet, updatePetWithForm} = require('../../helper/helper.js');
const faker = require('faker');

//Get Inventory
test('getInventory data types are correct', ()=>{
    //Test
    expect.hasAssertions();
    return getInventory().then((res)=>{
        Object.values(res).forEach((v, i)=>{
            expect(typeof v).toBe("number");
        })
    }).catch(err =>{
        console.log(err);
    });
});

describe('Test inventory data changes', ()=>{
    //Data Mocking
    let petId = 202;
    let name = faker.name.firstName();
    //Setup
    beforeAll(async() =>{
        await postPet(petId, name, [], "sick");
    })
    //Teardown
    afterAll(async()=>{
        await deletePet(petId);
    });
    // Test
    test('New status code sick is added', ()=>{
        expect.assertions(1);
        return getInventory().then((res)=>{
            let sick = res.sick;
            expect(sick).toBe(1);
        });
    })

    test('The pet that was sick moves to recovered', ()=>{
        expect.assertions(2);
        return updatePetWithForm(petId, name, "recovered").then((res) =>{
            getInventory().then((res)=>{
                let sick = res.sick;
                let recovered = res.recovered;
                expect(sick).not.toBeDefined();
                expect(recovered).toBe(1);
            })
        })
    })


})