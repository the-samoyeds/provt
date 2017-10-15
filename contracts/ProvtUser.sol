pragma solidity ^0.4.17;

contract ProvtUser {

    address Owner;
    bool vetted;

    bytes32 Name;
    bytes32 Company;
    bytes32 Website;

    event UserRequested(
        address indexed _owner,
        address indexed _id
    );

    function ProvtUser(bytes32 name, bytes32 company, bytes32 website) public payable {
        Owner = msg.sender;
        vetted = false;

        Name    = name;
        Company = company;
        Website = website;

        UserRequested(msg.sender, this);
    }

    function isVetted() constant public returns (bool) {
        return (vetted);
    }

    function getUser() constant public returns (address, bool, bytes32, bytes32, bytes32) {

        return (Owner, vetted, Name, Company, Website);
    }

    // function vet(address contractAt) public returns (bool success) {
       // Get Provt contract
        // address AdminId = contractAt.call(bytes4(keccak256("getAdmin()")));
        // address AdminId = Provt(contractAt).getAdmin();

    function vet() public returns (bool success) {
        address AdminId = address(0xE2E24bD988056313c4D5923584852Dcf9f4B19b4);
        address sender = msg.sender;

        if (sender == AdminId) {
            vetted = true;
            return true;
        } else {
            return false;
        }
      }
}
