// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "./PriceConverter.sol";

error NotOwner();

contract FundMe {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    using PriceConverter for uint256;

    uint8 public constant MINIMUM_USD = 10;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    function fundMe() public payable {
        //set minimum fund amount in ETH
        //msg.value >= 1e18 (1e18 == 1 * 10 ** 18)
        //if require faile, the entire function gets cancelled and unused gas is returned

        //require $x in USD
        require(
            msg.value.getConversionRate() >= MINIMUM_USD,
            "Didn't send enough ETH"
        );
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;
    }

    function withdraw() public payable onlyOwner {
        for (uint256 i; i < funders.length; i++) {
            addressToAmountFunded[funders[i]] = 0;
        }
        funders = new address[](0);

        //transfer (errors if fails)
        //payable(msg.sender).transfer(address(this).balance);

        //send (no error if fails)
        //bool sendSucces = payable(msg.sender).send(address(this).balance);
        //require(sendSucces, "send failed");

        //call (low level interactions)
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "call failed");
    }

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert NotOwner();
        }
        _;
    }

    receive() external payable {
        fundMe();
    }

    fallback() external payable {
        fundMe();
    }
}
