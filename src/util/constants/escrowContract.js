const address = '0xd61F9331CE61Eb27E0AB7d9b9bc75402Ea5db7f8';
const ABI = [
  [
    {
      constant: false,
      inputs: [],
      name: 'accept',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'cancel',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'deposit',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [
        {
          name: 'manager_address',
          type: 'address'
        },
        {
          name: 'worker_address',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      constant: true,
      inputs: [],
      name: 'kill',
      outputs: [],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'manager',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'worker',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }
  ]
];

export { address, ABI };
