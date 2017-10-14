<template>
  <div>
      Check your file \o/
      <drop v-on:dropped="dropFile"></drop>

      </br></br>
      <router-link :to="{ name: 'AddFile'}">Add File</router-link>
  </div>
</template>

<script>
/* global web3 */

const SimpleStore = require('../abi/simple_store');
import Drop from './Drop';

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
  color: #42b983;
}
</style>
