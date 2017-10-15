<template>
<div>
  <h1>File Information</h1>

  <p v-show="error">
    <b>Ooops!</b> {{ error }}
  </p>

  <pre v-show="Object.keys(fileInfo).length > 0">
    {{ JSON.stringify(fileInfo, null, 2) }}
  </pre>

  <p class="view-file-try-again">
    <router-link to="/">Check another file</router-link>
  </p>
</div>
</template>

<script>
import request from 'superagent';

export default {
  data() {
    return {
      error: '',
      fileInfo: {},
    };
  },

  created() {
    const fileDigest = this.$route.params.digest;

    request
      .get('/api/file')
      .query({ fileDigest: fileDigest.substring(2, fileDigest.length) })
      .end((err, resp) => {
        if (err) {
          this.error = 'Failed to load file information. Please try again.';
          return;
        }

        if (resp.body.length < 1) {
          this.error = 'File not found!';
          return;
        }

        this.fileInfo = resp.body[0];
      });
  },
};
</script>

<style scoped>
.view-file-try-again {
  margin-top: 120px;
}
</style>
