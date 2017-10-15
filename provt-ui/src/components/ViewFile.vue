<template>
<div>
  <p v-show="error">
    <h1>Could not find {{this.$route.params.filename}} on the Blockchain</h1>

    <b>Ooops!</b> {{ error }}
  </p>

  <div v-show="!error">
    <h1>Found {{this.$route.params.filename ? this.$route.params.filename : this.fileInfo.filename}} on the Blockchain</h1>

    <h2>User Profile</h2>
    <pre v-show="Object.keys(profileInfo).length > 0">
      {{ JSON.stringify(profileInfo, null, 2) }}
    </pre>

    <h2>File Information</h2>
    <pre v-show="Object.keys(fileInfo).length > 0">
      {{ JSON.stringify(fileInfo, null, 2) }}
    </pre>
  </div>

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
      profileInfo: {},
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


        request
          .get('/api/profile')
          .query({ fileDigest: fileDigest.substring(2, fileDigest.length) })
          .end((err2, resp2) => {
            if (err2) {
              this.error = 'Failed to load file information. Please try again.';
              return;
            }

            if (resp2.body.length < 1) {
              // this.error = 'User not found!';
              // return;
              this.profileInfo = { address: this.fileInfo.owner };
            } else {
              this.profileInfo = resp2.body[0];
            }
          });
      });
  },
};
</script>

<style scoped>
.view-file-try-again {
  margin-top: 120px;
}
</style>
