<template>
<div>
  <label>Name:</label>
  <span>{{ file.name }}</span>
</div>
</template>

<script>
export default {
  props: ['file'],
};
</script>
