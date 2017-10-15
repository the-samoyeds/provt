<template>
<div>
  <p v-show="transaction && !transaction.blockNumber">
    Transaction still pending...
  </p>

  <div v-show="transaction && transaction.blockNumber">
    <label>Block Number:</label>
    <span><a target="_blank" v-bind:href="'https://rinkeby.etherscan.io/block/'+transaction.blockNumber">{{ transaction.blockNumber }}</a></span>
  </div>

  <div v-show="transaction && transaction.blockNumber">
    <label>Block Hash:</label>
    <span><a target="_blank" v-bind:href="'https://rinkeby.etherscan.io/block/'+transaction.blockHash">{{ transaction.blockHash }}</a></span>
  </div>

  <div v-show="transaction && transaction.hash">
    <label>Transaction Hash:</label>
    <span><a target="_blank" v-bind:href="'https://rinkeby.etherscan.io/tx/'+transaction.hash">{{ transaction.hash }}</a></span>
  </div>

</div>
</template>

<script>
export default {
  props: ['transaction'],
};
</script>
