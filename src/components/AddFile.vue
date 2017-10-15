<template>
  <div>
    <div v-if="haveAccount">
      <div v-show="file">
        <form>
          <label for="name">Name</label>
          <input v-model="name" type="text" name="name"></input>
          <br/>

          <label for="description">Description</label>
          <input v-model="description" type="text" name="description"></input>
          <br/>

          <label for="fileDigest">fileDigest</label>
          <input v-model="fileDigest" type="text" name="fileDigest"></input>
          <br/>

          <!-- TODO: Implement "Add extra field" button. -->

          <!-- TODO: Disable button until `readyForSubmission` -->
          <button v-on:click="submitHandler">Submit</button>
        </form>
      </div>
      <div v-show="!file">
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
      file: null,
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

    dropFile(event) {
      this.file = event.dataTransfer.files[0];
      this.name = this.file.name;

      let fileReader = new FileReader();

      // FileReader is muy async.
      let self = this;
      fileReader.onloadend = function (event) {
        self.fileDigest = SHA3_256(this.result);
      };

      fileReader.readAsBinaryString(this.file);
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
