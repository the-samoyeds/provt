<template>
  <div class="full">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet">

    <router-link :to="{ name: 'CheckFile'}" class="add-btn">
        <i class="material-icons add-icon">check_circle</i>
        CHECK FILE
    </router-link>

    <div v-if="haveAccount" class="full">
      <div v-show="fileDigest">
        <form>
          <label for="name">Name</label>
          <input v-model="name" type="text" name="name"></input>
          <br/>

          <label for="description">Description</label>
          <input v-model="description" type="text" name="description"></input>
          <br/>

          <label for="fileDigest">fileDigest</label>
          <input v-model="fileDigest" type="hidden" name="fileDigest"></input>
          <br/>

          <!-- TODO: Implement "Add extra field" button. -->

          <!-- TODO: Disable button until `readyForSubmission` -->
          <button v-on:click="submitHandler">Submit</button>
        </form>
      </div>
      <div v-show="!fileDigest" class="full">
        Choose the file you want to add the information to the BlockChain
        <drop v-on:dropped="dropFile"></drop>
      </div>
    </div>
    <div v-else>
      Create an account on
      <a href="https://metamask.io/" target="_blank">MetaMask</a>
    </div>
  </div>
</template>

<script>
/* global web3 */

const SHA3_256 = require('js-sha3').sha3_256;
const Provt = require('../abi/provt');

import Drop from './Drop';

export default {
  name: 'AddFile',

  components: {
    drop: Drop,
  },

  data() {
    return {
      name: null,
      description: null,
      fileDigest: null,
    };
  },

  computed: {
    metadataDigest: function () {
      return SHA3_256(this.name + this.description + this.fileDigest);
    },
  },

  methods: {
    submitHandler() {
      if (web3 === 'undefined') return;

      // TODO: POST form to backend.
      // {
      //   "file": {
      //     "name": "...",
      //     "description": "...",
      //     "digest": "...",
      //   }
      // }

      // TODO: Create contract.
      let provtFileContract = new web3.auth.Contract(Provt);
      provtFileContract.deploy({
        data: '',
        arguments: ['']
      }).send({
        from: '',
        gas: '',
        gasPrice: ''
      });

      // TODO: POST transaction to backend.
    },

    dropFile(name, digest) {
      this.name = name;
      this.fileDigest = digest;
    },
  },

  readyForSubmission() {
    return this.fileDigest && this.metadataDigest;
  },

  created() {
    if (web3 === 'undefined') return;
    this.haveAccount = web3.eth.accounts.length > 0;
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
