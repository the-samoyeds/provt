module.exports = [
  {
    constant: false,
    inputs: [
      {
        name: 'x',
        type: 'uint256',
      },
    ],
    name: 'set',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'get',
    outputs: [
      {
        name: 'retVal',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'data',
        type: 'uint256',
      },
    ],
    name: 'DataStored',
    type: 'event',
  },
];
