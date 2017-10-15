<template>
<div class="file-info">
  <h2>
    File Information
    <i class="material-icons">attachment</i>
  </h2>
  <div class="info-field">
    <label>Name:</label>
    <span>{{ file.name }}</span>
  </div>

  <div class="info-field">
    <label>Description:</label>
    <span>{{ file.description }}</span>
  </div>

  <div class="info-field">
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

<style scoped>
.file-info {
  text-align: left;
}
</style>
