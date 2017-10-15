<template>
  <div class="full">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet">

      <router-link :to="{ name: 'AddFile'}" class="add-btn">
          <i class="material-icons add-icon">note_add</i>
          ADD FILE
      </router-link>

      <metamask-checker>
        <div v-show="!isLoading" class="full">
          Is this the file you were looking for?
          <drop v-on:dropped="dropFile"></drop>
        </div>
        <div v-show="isLoading">
          <stretch></stretch></br>
          Validating your file... Hold on tight!
        </div>
      </metamask-checker>
  </div>
</template>

<script>
/* global web3 */

import Stretch from 'vue-loading-spinner/src/components/Stretch';
import Provt from '../abi/provt';
import Drop from './Drop';
import MetaMaskChecker from './MetaMaskChecker';

export default {
  name: 'CheckFile',
  components: {
    drop: Drop,
    Stretch,
    'metamask-checker': MetaMaskChecker,
  },

  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    dropFile(name, digest) {
      this.isLoading = true;

      web3.eth.contract(Provt)
        .at('0x0c89ed690c343654d9b258872b4fd91a851459b1')
        .getFile(`0x${digest}`, (err, data) => {
          if (err) {
            console.error(err); // eslint-disable-line no-console
            return;
          }

          this.$router.push({ path: `/file/${data[2]}` });
        });
    },
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
