const {getInventory} = require('../../index.js');
const {postPet, deletePet, updatePet, updatePetWithForm} = require('../../helper/helper.js');
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
    }).catch(err =>{
        console.log(err);
    })
});