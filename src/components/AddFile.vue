<template>
  <div class="full">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">

    <router-link :to="{ name: 'CheckFile'}" class="add-btn">
        <i class="material-icons add-icon">check_circle</i>
        CHECK FILE
    </router-link>

    <div v-if="haveAccount" class="full">
      <div v-show="fileDigest">
        <form>
          <label for="name">Name</label>
          <input v-model="name" type="text" name="name" v-on:keyup="calculateMetaDigest"></input>
          <br/>

          <label for="description">Description</label>
          <textarea v-model="description" type="text" name="description" v-on:keyup="calculateMetaDigest"></textarea>
          <br/><br/><br/><br/><br/>

          <label class="digest-label" for="fileDigest">fileDigest:</label>
          <span name="fileDigest">{{fileDigest}}</span>
          <br/>
          <label class="digest-label" for="metadataDigest">metadataDigest:</label>
          <span name="metadataDigest">{{metadataDigest}}</span>
          <br/>

          <!-- TODO: Implement "Add extra field" button. -->

          <!-- TODO: Disable button until `readyForSubmission` -->
          <button class="submit-btn" v-on:click="submitHandler">Submit</button>
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

import SHA3_256 from 'js-sha3';
import Drop from './Drop';
import Provt from '../abi/provt';

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
      metadataDigest: null,
    };
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
      const provtFileContract = new web3.auth.Contract(Provt);
      provtFileContract.deploy({
        data: '',
        arguments: [''],
      }).send({
        from: '',
        gas: '',
        gasPrice: '',
      });

      // TODO: POST transaction to backend.
    },

    dropFile(name, digest) {
      this.name = name;
      this.fileDigest = digest;
      this.metadataDigest = SHA3_256.sha3_256(this.name + this.description + this.fileDigest);
    },

    calculateMetaDigest() {
      this.metadataDigest = SHA3_256.sha3_256(this.name + this.description + this.fileDigest);
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

label {
  color: #024669;
  font-family: 'Open Sans', sans-serif;
  font-size: 25px;
  display: inline-block;
  width: 140px;
  text-align: right;
}

.digest-label {
  width: 195px;
}

input {
  height: 25px;
  width: 470px;
  border: none;
  border-bottom: 1px solid #024669;
  margin-left: 10px;
  font-size: 15px;
}

textarea {
  width: 470px;
  height: 75px;
  border: none;
  border-bottom: 1px solid #024669;
  margin-top: 5px;
  margin-left: 10px;
  font-size: 15px;
}

span {
  width: 500px;
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

.submit-btn {
  margin-top: 50px;
  width: 150px;
  height: 50px;
  font-family: 'Open Sans', sans-serif;
  font-size: 15px;
  background: #025682;
  background-image: linear-gradient(to bottom, #025682, #024669);
  border-radius: 10px;
  color: #ffffff;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  border: none;
}


.submit-btn:hover {
  background: #025682;
  background-image: linear-gradient(to bottom, #0370a9, #035884);
}

</style>
