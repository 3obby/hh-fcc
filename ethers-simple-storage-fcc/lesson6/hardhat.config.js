require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */

const RPC_URL = process.env.RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
    },
    solidity: "0.8.9",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
}

task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})
