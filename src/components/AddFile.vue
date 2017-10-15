<template>
  <div>
    <div v-if="haveAccount">
      <!-- <h2>Accounts</h2>
      <ul>
        <li v-for="(balance, account) in accounts" :key="account">
          <code>{{ account }}</code>: {{ balance }} eth
        </li>
      </ul>
      <p>{{ value }}</p>
      <button v-on:click="callContract">Call</button> -->

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

          <button v-on:click="callContract">Submit</button>
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

const Keccak256 = require('js-sha3').keccak256;
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
      console.log('ulala');
      const digest = SHA3_256(this.name + this.description + this.fileDigest);
      return digest;
    },
  },

  methods: {
    // callContract() {
    //   if (web3 === 'undefined') return;
    //
    //   const SimpleStoreContract = web3.eth.contract(SimpleStore).at('0x893173504b95dd72a323ad1cac246b23808924cf');
    //   SimpleStoreContract.get.call((err, data) => {
    //     this.value = data;
    //   });
    // },

    // getDigest(data) {
    //   let hash = SHA3.SHA3Hash(256);
    //   hash.update(data);
    //   return hash.digest('hex');
    // },

    callContract(event) {
      if (web3 === 'undefined') return;

      console.log(event.target);

      const fileData = null;
      const fileMetadata = null;

      // const fileDigest = Keccak256(fileData);
      const fileDigest = SHA3_256(fileData);
      // const metadataDigest = Keccak256(fileMetadata);;
      const metadataDigest = SHA3_256(fileMetadata);;

      console.log('fileDigest: ' + fileDigest);
      console.log('fileMetadataDigest: ' + fileMetadataDigest);
    },

    dropFile(event) {
      console.log(event.dataTransfer);
      console.log(event.dataTransfer.files);

      this.file = event.dataTransfer.files[0];
      console.log(this.file);

      this.name = this.file.name;

      let fileReader = new FileReader();
      let self = this;
      fileReader.onloadend = function (event) {
        // console.log(Keccak256(this.result));
        // console.log(SHA3_256(this.result));

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
