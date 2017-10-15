<template>
<div>
  <p v-show="transaction && !transaction.blockNumber">
    Transaction still pending...
  </p>

  <div v-show="transaction && transaction.blockNumber">
    <label>Block Number:</label>
    <span>{{ transaction.blockNumber }}</span>
  </div>
</div>
</template>

<script>
export default {
  props: ['transaction'],
};
</script>
