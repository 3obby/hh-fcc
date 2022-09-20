// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./simpleStorage.sol";

contract StorageFactory {
    SimpleStorage[] public simpleStorage; //an array of simpleStorage Contracts

    function createSimpleStorageContract() public {
        simpleStorage.push(new SimpleStorage());
    }

    function addCar(
        uint256 _index,
        string calldata _vin,
        string calldata _make,
        string calldata _model,
        uint16 _year,
        uint16 _numOwners,
        bool _cleanTitle
    ) public {
        //address + abi are auto included in the instance below thanks to the import
        SimpleStorage instance = simpleStorage[_index];
        instance.addCar(_vin, _make, _model, _year, _numOwners, _cleanTitle);
    }

    function vinToIndexMap(uint256 _index, string calldata _vin)
        public
        view
        returns (uint256)
    {
        return simpleStorage[_index].vinToIndexMap(_vin);
    }
}
