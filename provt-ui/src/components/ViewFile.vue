<template>
<metamask-checker v-on:web3-ready="web3Loaded">
  <div v-show="error">
    <h1>Could not find "{{ displayFilename }}" on the Blockchain</h1>

    <b>Ooops!</b> {{ error }}
  </div>

  <div v-show="!error">
    <h1>Found "{{ displayFilename }}" on the Blockchain</h1>

    <h2>User Profile</h2>
    <pre v-show="profileInfo && Object.keys(profileInfo).length > 0">
      {{ JSON.stringify(profileInfo, null, 2) }}
    </pre>

    <h2>File Information</h2>
    <pre v-show="fileInfo && Object.keys(fileInfo).length > 0">
      {{ JSON.stringify(fileInfo, null, 2) }}
    </pre>

    <h2>Transaction</h2>
    <p v-show="transaction && !transaction.blockNumber">
      Transaction still pending...
    </p>
    <pre v-show="transaction && transaction.blockNumber">
      {{ JSON.stringify(transaction, null, 2) }}
    </pre>
  </div>

  <p class="view-file-try-again">
    <router-link to="/">Check another file</router-link>
  </p>
</metamask-checker>
</template>

<script>
/* global web3 */

import request from 'superagent';
import MetaMaskChecker from './MetaMaskChecker';

export default {
  components: {
    'metamask-checker': MetaMaskChecker,
  },

  data() {
    return {
      error: '',
      fileInfo: null,
      profileInfo: null,
      transaction: null,
      web3Ready: false,
    };
  },

  computed: {
    displayFilename() {
      let displayFilename;
      const maxFilenameLength = 30;

      const uploadedFilename = this.$route.params.filename;

      if (uploadedFilename) {
        displayFilename = uploadedFilename;
      } else {
        displayFilename = this.fileInfo ? this.fileInfo.filename : '';
      }

      return `${displayFilename.substring(0, maxFilenameLength)}${displayFilename.length > maxFilenameLength ? '...' : ''}`;
    },
  },

  methods: {
    web3Loaded() {
      this.web3Ready = true;
      this.loadTransaction();
    },

    loadTransaction() {
      if (!this.web3Ready || !this.fileInfo) {
        // not ready yet
        return;
      }

      const txid = this.fileInfo.txid;
      web3.eth.getTransaction(txid, (err, tx) => {
        if (err) {
          this.error = 'Failed to load transaction for file. Please try again.';
          return;
        }

        this.transaction = tx;

        if (!tx.blockNumber) {
          // transaction still pending, let's check back on it again later
          const self = this;
          setTimeout(self.loadTransaction, 1000);
        }
      });
    },
  },

  mounted() {
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
        this.loadTransaction();

        request
          .get('/api/profile')
          .query({ address: this.fileInfo.owner })
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
  margin-top: 60px;
}
</style>
