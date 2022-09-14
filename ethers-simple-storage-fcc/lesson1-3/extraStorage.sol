// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./simpleStorage.sol";

contract ExtraStorage is SimpleStorage {
    //override here
    //virtual on target function to be overridden
    function addCar(
        string calldata _vin,
        string calldata _make,
        string calldata _model,
        uint16 _year,
        uint16 _numOwners,
        bool _cleanTitle
    ) public override {
        require(_cleanTitle == true);
        carArr.push(Car(_vin, _make, _model, _year, _numOwners, _cleanTitle));
        vinToId[_vin] = carArr.length - 1;
    }
}
