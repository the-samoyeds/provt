pragma solidity ^0.4.17;

import "Provt.sol";

contract ProvtUser {

    address ProvtContract;
    address Owner;
    bool vetted;

    bytes32 Name;
    bytes32 Company;
    bytes32 Website;

    event UserRequested(
        address provtContract,
        address indexed _owner,
        address indexed _id
    );

    function ProvtUser(address provtContract, bytes32 name, bytes32 company, bytes32 website) public payable {
        Owner = msg.sender;
        vetted = false;

        ProvtContract = provtContract;

        Name    = name;
        Company = company;
        Website = website;

        UserRequested(provtContract, msg.sender, this);
    }

    function isVetted() constant public returns (bool) {
        return (vetted);
    }

    function getUser() constant public returns (address, bool, bytes32, bytes32, bytes32) {

        return (Owner, vetted, Name, Company, Website);
    }

    function vet() public returns (bool success) {
       // Get Provt contract
        address AdminId = Provt(ProvtContract).getAdmin();
        address sender = msg.sender;

        if (sender == AdminId) {
            vetted = true;
            return true;
        } else {
            return false;
        }
      }
}
