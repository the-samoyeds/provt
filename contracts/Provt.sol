pragma solidity ^0.4.17;

contract Provt {

  address ProvtAdmin;

//   struct User {
//     bytes32 name;
//     bytes32 company;
//     bytes32 website;
//   }
//   mapping ( address => User ) Users;
//   address[] usersByAddress;

  struct File {
    address creator;
    bytes32 hash;
    bytes32 metadataHash;
    uint addedAt;
  }
  mapping ( bytes32 => File ) Files;
  bytes32[] filesByHashes;


  function Provt() public payable {
    ProvtAdmin = msg.sender;
  }

  modifier onlyAdmin() {
      if (msg.sender != ProvtAdmin)
        throw;
      // Do not forget the "_;"! It will be replaced by the actual function body when the modifier is used.
      _;
  }

//   function registerNewUser(bytes32 name, bytes32 company, bytes32 website) returns (bool success) {
//     address userAddress = msg.sender;

//     // don't overwrite existing entries, and make sure handle isn't null
//     if(Users[userAddress].name.length == 0 && name.length != 0){
//       Users[userAddress].name = name;
//       Users[userAddress].company = company;
//       Users[userAddress].website = website;

//       usersByAddress.push(userAddress);  // adds an entry for this user to the user 'whitepages'
//       return true;
//     } else {
//       return false; // either handle was null, or a user with this handle already existed
//     }
//   }


  function addFile(bytes32 hash, bytes32 metadataHash) public returns (bool success) {
    address creator = msg.sender;

    File storage file = Files[hash];

    // don't overwrite existing entries, and make sure handle isn't null
    // if(Files[hash].metadataHash.length == 0 && metadataHash.length != 0){
    if(file.hash == 0 && metadataHash.length != 0){
      Files[hash].creator = creator;
      Files[hash].hash = hash;
      Files[hash].metadataHash = metadataHash;
      Files[hash].addedAt = block.timestamp;

      filesByHashes.push(hash);  // adds an entry for this user to the user 'whitepages'
      return true;
    } else {
      return false; // either handle was null, or a user with this handle already existed
    }
  }

  function getAdmin() constant public returns (address) { return ProvtAdmin; }

  function getFiles() constant public returns (bytes32[]) { return filesByHashes; }


//   function getUser(address user) constant returns (bytes32,bytes32,bytes32) {
//     return (Users[user].name,Users[user].company,Users[user].website);
//   }

  function getFile(bytes32 hash) constant public returns (address,bytes32,bytes32,uint) {
    File storage file = Files[hash];

    return (file.creator, file.hash, file.metadataHash, file.addedAt);
  }

}
