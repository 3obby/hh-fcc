// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

//can import interfaces from repo:
//https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol
//the @ is an NPM package chainlink/contracts
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice() public view returns (uint256) {
        //referencing external data, need address and abi (abi auto-included from import statement)
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        );
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        answer *= 1e10;
        return uint256(answer);
    }

    function getConversionRate(uint256 ethAmount)
        public
        view
        returns (uint256)
    {
        uint256 ethPrice = getPrice();
        //==3000_000000000000000000
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / (1e18 * 2);
        return ethAmountInUsd;
    }
}
