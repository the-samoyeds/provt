<template>
  <div>

      <div v-if="haveAccount">
          <h2>Accounts</h2>
          <ul>
            <li v-for="(balance, account) in accounts" :key="account">
              <code>{{ account }}</code>: {{ balance }} eth
            </li>
          </ul>
          <p>{{ value }}</p>
          <button v-on:click="callContract">Call</button>
          <drop v-on:dropped="dropFile"></drop>
      </div>
      <div v-else>
          Create an account on <a href="https://metamask.io/" target="_blank">Metamask</a>
      </div>

  </div>
</template>

<script>
/* global web3 */

const SimpleStore = require('../abi/simple_store');
import Drop from './Drop';

export default {
  name: 'AddFile',

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
        console.log('drop on add');
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

    if (accounts.length > 0) {
        this.haveAccount = true;
    } else {
        this.haveAccount = false;
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

#drop_zone {
  border: 1px dashed skyblue;
  width: 70%;
  height: 120px;
  margin-left: 15%;
  margin-top: 20px;
}

.drop_text {
    font-size: 20px;
    position: relative;
    top: 46px;
}
</style>
