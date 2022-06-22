const CRUD = artifacts.require("CRUD");

contract("CRUD contract tests", _ =>{

    it("Can create and get user", async () =>{
        let crud = await CRUD.deployed();
        let name = "Satoshi";
        await crud.createUser(0, name);
        let user_name = await crud.getUser(0);
        assert.equal(name, user_name);
    });

    it("Cannot add a user with the same id - error should be catched", async () => {
        let crud = await CRUD.deployed();
        let name = "Satoshi";
        try {
            await crud.createUser(0, name);
            console.log("No error catched");
            assert.equal(1,2);
        } catch (error) {
            console.log("Catched error: " + error.reason);
            assert.equal(error.reason, "User already exists");
        };
    });

    it("User name can be updated", async () => {
        let crud = await CRUD.deployed();
        let name = "Nakamoto";
        await crud.updateUser(0, name);
        let user_name = await crud.getUser(0);
        assert.equal(name, user_name);
    });

    it("Cannot update non existing user - error should be catched", async () => {
        let crud = await CRUD.deployed();
        let name = "Satoshi";
        try {
            await crud.updateUser(10, name);
            console.log("No error catched");
            assert.equal(1,2);
        } catch (error) {
            console.log("Catched error: " + error.reason);
            assert.equal(error.reason, "User not found");
        };
    });

    it("Can remove user, verify by getting - error should be catched", async () => {
        let catchRevert = require("./exceptions.js").catchRevert;
        let crud = await CRUD.deployed();
        await crud.removeUser(0);
        await catchRevert(crud.getUser(0), "User not found");

    });

    it("Cannot get non existing user - error should be catched", async () => {
        let catchRevert = require("./exceptions.js").catchRevert;
        let crud = await CRUD.deployed();
        await catchRevert(crud.getUser(4), "User not found");

    });

})
