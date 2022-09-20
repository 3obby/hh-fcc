const { assert } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage", () => {
    let preContract
    let contract
    beforeEach(async function () {
        preContract = await ethers.getContractFactory("SimpleStorage")
        contract = await preContract.deploy()
    })
    it("Should start with a favorite car of Porsche 992.2 GT3", async () => {
        const rx = await contract.getFavoriteCar()
        assert(
            rx == "Porsche 992.2 GT3",
            "Default Favorite isn't Porsche 992.2 GT3"
        )
    })
    it("Should update favorite car to Porsche GT4 RS", async () => {
        let rx = await contract.setFavoriteCar("Porsche GT4 RS")
        await rx.wait(1)
        rx = await contract.getFavoriteCar()
        assert(rx == "Porsche GT4 RS", "Updated Favorite isn't Porsche GT4 RS")
    })
})
