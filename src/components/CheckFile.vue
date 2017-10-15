<template>
  <div style="height: 100%;">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet">

      <router-link :to="{ name: 'AddFile'}" class="add-btn">
          <i class="material-icons add-icon">note_add</i>
          ADD FILE
      </router-link>

      Is this the file you were looking for?
      <drop v-on:dropped="dropFile"></drop>

  </div>
</template>

<script>
/* global web3 */

const SimpleStore = require('../abi/simple_store');
import Drop from './Drop';
var isLoading = false;

export default {
  name: 'CheckFile',
  components: {
      drop: Drop,
  },

  data() {
    return {
      accounts: {},
      value: null,
    };
  },

  methods: {
    callContract() {
      if (web3 === 'undefined') return;

      const SimpleStoreContract = web3.eth.contract(SimpleStore).at('0x893173504b95dd72a323ad1cac246b23808924cf');
      SimpleStoreContract.get.call((err, data) => {
        this.value = data;
      });
    },

    dropFile() {
        console.log('drop on check');
        // hash = calculateHash() => H function to create hash
        // fileBlockchain = getFile(hash);  => call to B function on blockchain
        // file = getFileInfo(fileBlockchain.creator, fileBlockchain.hash, fileBlockchain.metadataHash) => L function to return the file info

    },
  },

  created() {
    if (web3 === 'undefined') return;

    const accounts = web3.eth.accounts;
    const balances = {};


    for (let i = 0; i < accounts.length; i += 1) {
      const account = accounts[i];
      web3.eth.getBalance(account, (err, balance) => {
        balances[account] = web3.fromWei(balance.toNumber(), 'ether');
        this.accounts = balances;
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #024669;
  text-decoration: none;
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 25px;
}

.add-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 94px;
}

.add-btn:hover {
    cursor: pointer;
}

.add-icon {
  font-size: 60px;
  color: #024669;
}

#drop_zone {
  height: calc(100% - 130px);
}

</style>
