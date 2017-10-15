<template>
<div>
  <div>
    <label>Ethereum Address:</label>
    <span>{{ profile.address }}</span>
  </div>

  <div v-show="profile.name">
    <label>Name:</label>
    <span>{{ profile.name }}</span>
  </div>

  <div v-show="profile.company">
    <label>Company:</label>
    <span>{{ profile.company }}</span>
  </div>

  <div v-show="profile.website">
    <label>Website:</label>
    <span><a target="_blank" v-bind:href="'//'+profile.website">{{ profile.website }}</a></span>
  </div>
</div>
</template>

<script>
export default {
  props: ['profile'],
};
</script>
