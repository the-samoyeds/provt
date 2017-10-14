module.exports = [{
    "constant": true,
    "inputs": [],
    "name": "getUser",
    "outputs": [{
        "name": "",
        "type": "address"
    }, {
        "name": "",
        "type": "bool"
    }, {
        "name": "",
        "type": "bytes32"
    }, {
        "name": "",
        "type": "bytes32"
    }, {
        "name": "",
        "type": "bytes32"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "isVetted",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "vet",
    "outputs": [{
        "name": "success",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "name": "name",
        "type": "bytes32"
    }, {
        "name": "company",
        "type": "bytes32"
    }, {
        "name": "website",
        "type": "bytes32"
    }],
    "payable": true,
    "stateMutability": "payable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "_owner",
        "type": "address"
    }, {
        "indexed": true,
        "name": "_id",
        "type": "address"
    }],
    "name": "UserRequested",
    "type": "event"
}]
