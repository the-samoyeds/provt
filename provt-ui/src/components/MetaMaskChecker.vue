<template>
  <div class="full">
    <div v-show="metamaskReady" class="full">
      <slot></slot>
    </div>
    <div v-show="!metamaskReady">
        <p>Loading MetaMask...</p>
        <p>Don't have an account? Create one at <a href="https://metamask.io/" target="_blank">Metamask</a></p>
    </div>
  </div>
</template>

<script>
/* global web3, Web3 */

export default {
  data() {
    return {
      metamaskReady: false,
    };
  },

  mounted() {
    // wait for MetaMask
    const self = this;
    const checker = setInterval(() => {
      if (typeof web3 !== 'undefined') {
        clearInterval(checker);
        self.metamaskReady = true;
        window.web3 = new Web3(web3.currentProvider);
        self.$emit('web3-ready');
      }
    }, 500);
  },
};
</script>

<style scoped>
.full {
  height: 100%;
}
</style>
