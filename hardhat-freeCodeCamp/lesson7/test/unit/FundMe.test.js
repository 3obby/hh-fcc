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
            const startingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            )
            const startingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            )
            const txresp = await fundMe.withdraw()
            const {gasUsed, effectiveGasPrice} = await txresp.wait(1)
            
            const gasCost = gasUsed.mul(effectiveGasPrice)

            const endingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            )
            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            )
            assert.equal(endingFundMeBalance, 0)
            assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(), endingFundMeBalance.add(endingDeployerBalance).add(gasCost).toString())
        })

        it("allows us to withdraw with multiple funders", async function(){
            const accounts = await ethers.getSigners()
            for(i=0;i<6;i++){
                const fundMeConnectedContract = await fundMe.connect(
                    accounts[i]
                )
                await fundMeConnectedContract.fund({value: sendValue})
                
                const startingFundMeBalance = await fundMe.provider.getBalance(
                    fundMe.address
                )
                const startingDeployerBalance = await fundMe.provider.getBalance(
                    deployer
                )
                const txresp = await fundMe.withdraw()
            const {gasUsed, effectiveGasPrice} = await txresp.wait(1)
            
            const gasCost = gasUsed.mul(effectiveGasPrice)

            const endingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            )
            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            )
            assert.equal(endingFundMeBalance, 0)
            assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(), endingFundMeBalance.add(endingDeployerBalance).add(gasCost).toString())

            await expect(fundMe.funders(0)).to.be.reverted
            
            assert.equal(await fundMe.addressToAmountFunded(accounts[i].address), 0)
            }
        })

        it("only allows owner to withdraw", async function () {
            const accounts = await ethers.getSigners()
            const attacker = accounts[1]
            fundMeConnectedContract = await fundMe.connect(attacker)

            await expect(fundMeConnectedContract.withdraw()).to.be.reverted
        })

    })
})
