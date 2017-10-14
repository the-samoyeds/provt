module.exports = [{
    "constant": true,
    "inputs": [],
    "name": "getFiles",
    "outputs": [{
        "name": "",
        "type": "bytes32[]"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "hash",
        "type": "bytes32"
    }],
    "name": "getFile",
    "outputs": [{
        "name": "",
        "type": "address"
    }, {
        "name": "",
        "type": "bytes32"
    }, {
        "name": "",
        "type": "bytes32"
    }, {
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "hash",
        "type": "bytes32"
    }, {
        "name": "metadataHash",
        "type": "bytes32"
    }],
    "name": "addFile",
    "outputs": [{
        "name": "success",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getAdmin",
    "outputs": [{
        "name": "",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "constructor"
}]
