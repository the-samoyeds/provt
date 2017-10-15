<template>
<div>
  <div>
    <label>Name:</label>
    <span>{{ file.name }}</span>
  </div>

  <div>
    <label>Description:</label>
    <span>{{ file.description }}</span>
  </div>

  <div>
    <label>Original Filename:</label>
    <span>{{ file.filename }}</span>
  </div>
</div>
</template>

<script>
export default {
  props: ['file'],
};
</script>
