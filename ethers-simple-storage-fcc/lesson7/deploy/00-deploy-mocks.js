const { network, ethers } = require("hardhat")
const { developmentChains, V3MockArgs } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const curNetwork = await ethers.provider.getNetwork()
    log(`Network: ${curNetwork.name}`)
    log(`ChainId: ${curNetwork.chainId}`)

    if (developmentChains.includes(network.name)) {
        log("local network detected, deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [V3MockArgs.DECIMALS, V3MockArgs.INITIAL_ANSWER],
        })
        log("Mocks Deployed")
        log("--------------")
    }
}

module.exports.tags = ["all", "mocks"]
