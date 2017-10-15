<template>
  <div class="full">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet">

      <router-link :to="{ name: 'AddFile'}" class="add-btn">
          <i class="material-icons add-icon">note_add</i>
          ADD FILE
      </router-link>

      <div v-if="haveAccount" class="full">
        <div v-show="!isLoading" class="full">
          Is this the file you were looking for?
          <drop v-on:dropped="dropFile"></drop>
        </div>
        <div v-show="isLoading">
          <stretch></stretch></br>
          Validating your file... Hold on tight!
        </div>

        <p>{{ fileBlockchain }}</p>
      </div>
      <div v-else>
          Create an account on <a href="https://metamask.io/" target="_blank">Metamask</a>
      </div>

  </div>
</template>

<script>
/* global web3 */

import Stretch from 'vue-loading-spinner/src/components/Stretch';
import Provt from '../abi/provt';
import Drop from './Drop';

export default {
  name: 'CheckFile',
  components: {
    drop: Drop,
    Stretch,
  },

  data() {
    return {
      accounts: {},
      value: null,
      isLoading: false,
      fileBlockchain: null,
    };
  },

  methods: {
    dropFile(name, digest) {
      this.isLoading = true;

      const ProvtFileContract = web3.eth.contract(Provt).at('0x0c89ed690c343654d9b258872b4fd91a851459b1');
      ProvtFileContract.getFile(digest, (err, data) => {
        this.fileBlockchain = data;
      });
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

.full {
  height: 100%;
}

</style>
