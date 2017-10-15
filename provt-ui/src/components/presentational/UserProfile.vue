<template>
<div class="user-profile">
  <h2>
    Owner Profile
    <i class="material-icons">face</i>
  </h2>
  <div class="info-field">
    <label>Ethereum Address:</label>
    <span>{{ profile.address }}</span>
  </div>

  <div class="info-field" v-show="profile.name">
    <label>Name:</label>
    <span>{{ profile.name }}</span>
  </div>

  <div class="info-field" v-show="profile.company">
    <label>Company:</label>
    <span>{{ profile.company }}</span>
  </div>

  <div class="info-field" v-show="profile.website">
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

<style scoped>
.user-profile {
  text-align: left;
}
</style>
