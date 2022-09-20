const networkConfig = {
    5: {
        name: "goerli",
        ethUsd: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
    80001: {
        name: "mumbai",
        ethUsd: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
    },
}

const developmentChains = ["hardhat", "localhost"]

const V3MockArgs = {
    DECIMALS: 8,
    INITIAL_ANSWER: 160000000000,
}

module.exports = {
    networkConfig,
    developmentChains,
    V3MockArgs,
}
