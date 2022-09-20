const { ethers, run, network } = require("hardhat")
const fs = require("fs-extra")
const env = require("hardhat")
require("dotenv").config()

async function main() {
    const factory = await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying Contract...")
    const SimpleStorage = await factory.deploy()
    await SimpleStorage.deployed()
    console.log(`Deployed contract to ${SimpleStorage.address}`)
    console.log(network.config)
    if (network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
        await SimpleStorage.deployTransaction.wait(6)
        await verify(SimpleStorage.address, [])
    }
}

async function verify(contractAddress, args) {
    console.log("verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        console.log(error)
    }
}

main()
    .then(() => {
        console.log("Closing")
        process.exit(0)
    })
    .catch((error) => {
        console.log("Error Encountered:")
        console.error(error)
        process.exit(1)
    })
