<template>
  <div class="full">

    <metamask-checker>
      <div v-show="isLoading">
        <stretch></stretch></br>
        Validating your file... Hold on tight!
      </div>

      <div v-show="!isLoading" class="full">
        Is this the file you were looking for?
        <drop v-on:dropped="verifyFile"></drop>
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
    Drop,
    Stretch,
    'metamask-checker': MetaMaskChecker,
  },

  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    verifyFile(name, digest) {
      this.isLoading = true;

      web3.eth.contract(Provt)
        .at('0x0c89ed690c343654d9b258872b4fd91a851459b1')
        .getFile(`0x${digest}`, (err, data) => {
          if (err) {
            console.error(err); // eslint-disable-line no-console
            return;
          }

          this.$router.push({ path: `/file/${data[1]}/${name}` });
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
