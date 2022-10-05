const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts, log } = require("hardhat")

describe("FundMe", function () {
    let fundMe
    let mockV3Aggregator
    let deployer
    const sendValue = ethers.utils.parseEther("1")
    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)
        
        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer
        )
    })

    describe("constructor", function () {
        it("sets the aggregator addresses correctly", async () => {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.address)
            expect(mockV3Aggregator.withdraw).to.changeEtherBalance
        })
    })

    describe("fund", async function (){
        it("Fails if you don't send enough ETH", async function () {
            await expect(fundMe.fund()).to.be.revertedWith("You need to spend more ETH!")
        })
        it("updated the amount funded data structure", async function () {
            await fundMe.fund({value: sendValue})
            const resp = await fundMe.addressToAmountFunded(
                deployer
            )
            assert.equal(resp.toString(), sendValue.toString())
        })
        it("Adds funder to the array of funders", async function(){
            await fundMe.fund({value: sendValue})
            const resp = await fundMe.funders(0)
            assert.equal(resp, deployer)
        })
    })

    describe("withdraw", async function () {
        beforeEach(async function(){
            await fundMe.fund({value:sendValue})
        })

        it("withdraws ETH from a single founder", async function(){
            
        })
    })
})
