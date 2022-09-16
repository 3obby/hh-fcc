const { network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")

module.exports.default = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const ethUsd = networkConfig[chainId][ethUsd]

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsd],
        log: true,
    })
}
