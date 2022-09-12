// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

contract FallbackExample {
    uint public result;

    //trigger on eth received, but not if 0 eth sent
    receive() external payable {
        result = 1;
    }

    fallback() external payable {
        result = 2;
    }
}

//if msg.data empty, fallback
//if msg.data not empty and no receive, fallback
//if msg.data not empty and receive, receive
