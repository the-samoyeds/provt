<template>
<div>
  <label>Ethereum Address:</label>
  <span>{{ profile.address }}</span>
</div>
</template>

<script>
export default {
  props: ['profile'],
};
</script>
