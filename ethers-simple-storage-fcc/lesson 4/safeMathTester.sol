// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library SafeMathTester {
    function oldWay() public pure returns (uint8) {
        uint8 num = 255;
        unchecked {
            num = num + 1;
        }
        return num;
    }

    function newWay() public pure returns (uint8) {
        uint8 num = 255;
        num = num + 1;
        return num;
    }
}
