<template>
<metamask-checker v-on:web3-ready="onWeb3Ready">
  <div v-show="error">
    <h1>Could not find "{{ displayFilename }}" on the Blockchain</h1>

    <b>Ooops!</b> {{ error }}
  </div>

  <div v-show="!error">
    <h1>Found "{{ displayFilename }}" on the Blockchain</h1>

    <h2>User Profile</h2>
    <user-profile :profile="profileInfo" v-show="Object.keys(profileInfo).length > 0"></user-profile>

    <h2>File Information</h2>
    <file :file="fileInfo" v-show="Object.keys(fileInfo).length > 0"></file>

    <h2>Transaction</h2>
    <transaction :transaction="txInfo" v-show="txInfo.blockNumber"></transaction>
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
import UserProfile from './presentational/UserProfile';
import File from './presentational/File';
import Transaction from './presentational/Transaction';

export default {
  components: {
    'metamask-checker': MetaMaskChecker,
    UserProfile,
    File,
    Transaction,
  },

  data() {
    return {
      error: '',
      fileInfo: {},
      profileInfo: {},
      txInfo: {},
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
    onWeb3Ready() {
      this.web3Ready = true;
      this.loadTxInfo();
    },

    loadFileInfo(fileDigest) {
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
          this.loadTxInfo();
          this.loadProfileInfo();
        });
    },

    loadTxInfo() {
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

        this.txInfo = tx;

        if (!tx.blockNumber) {
          // transaction still pending, let's check back on it again later
          const self = this;
          setTimeout(self.loadTxInfo, 1000);
        }
      });
    },

    loadProfileInfo() {
      request
        .get('/api/profile')
        .query({ address: this.fileInfo.owner })
        .end((err, resp) => {
          if (err) {
            this.error = 'Failed to load file information. Please try again.';
            return;
          }

          if (resp.body.length < 1) {
            // this.error = 'User not found!';
            // return;
            this.profileInfo = { address: this.fileInfo.owner };
          } else {
            this.profileInfo = resp.body[0];
          }
        });
    },
  },

  mounted() {
    const fileDigest = this.$route.params.digest;
    this.loadFileInfo(fileDigest);
  },
};
</script>

<style scoped>
.view-file-try-again {
  margin-top: 60px;
}
</style>
