<template>
  <div class="full">
    <router-link to="/" class="add-btn">
      <i class="material-icons add-icon">check_circle</i>
      CHECK FILE
    </router-link>

    <metamask-checker>

      <div v-show="fileDigest">
        <h1>Profile Information (Optional)</h1>


        <form>
          <label for="profileName">Name</label>
          <input v-model="profileName" type="text" name="profileName"></input>
          <br/>

          <label for="profileName">Company</label>
          <input v-model="profileCompany" type="text" name="profileCompany"></input>
          <br/>

          <label for="profileWebsite">Website</label>
          <input v-model="profileWebsite" type="text" name="profileWebsite"></input>
          <br/>
        </form>

        <br/>

        <h1>File Information</h1>
        <form>
          <label for="name">Name</label>
          <input v-model="name" type="text" name="name" v-on:keyup="calculateMetaDigest"></input>
          <br/>

          <label for="description" class="textarea-lbl">Description</label>
          <textarea v-model="description" type="text" name="description" v-on:keyup="calculateMetaDigest"></textarea>
          <br/><br/><br/><br/><br/>

          <label class="digest-label" for="fileDigest">File digest:</label>
          <span class="code" name="fileDigest">{{fileDigest}}</span>
          <br/>
          <label class="digest-label" for="metadataDigest">Metadata digest:</label>
          <span class="code" name="metadataDigest">{{metadataDigest}}</span>
          <br/>

          <!-- TODO: Implement "Add extra field" button. -->

          <!-- TODO: Disable button until `readyForSubmission` -->
          <button class="submit-btn" v-on:click="submitHandler">Submit</button>
        </form>
      </div>

      <div v-show="!fileDigest" class="full">
        Choose the file you want to add the information to the BlockChain
        <drop v-on:dropped="dropFile"></drop>
      </div>
    </metamask-checker>
  </div>
</template>

<script>
/* global web3 */

import SHA3_256 from 'js-sha3';
import request from 'superagent';
import Drop from './Drop';
import MetaMaskChecker from './MetaMaskChecker';
import Provt from '../abi/provt';

export default {
  name: 'AddFile',

  components: {
    drop: Drop,
    'metamask-checker': MetaMaskChecker,
  },

  data() {
    return {
      profileName: null,
      profileCompany: null,
      profileWebsite: null,
      filename: null,
      name: null,
      description: null,
      fileDigest: null,
      metadataDigest: null,
    };
  },

  methods: {
    submitHandler(ev) {
      ev.preventDefault();

      if (web3 === 'undefined') return;

      web3.eth.contract(Provt).at('0x0c89ed690c343654d9b258872b4fd91a851459b1')
        .addFile.sendTransaction(`0x${this.fileDigest}`, `0x${this.metadataDigest}`, (err, resp) => {
          if (err) {
            console.error(err); // eslint-disable-line no-console
            return;
          }

          request
            .post('/api/profile')
            .send({
              address: web3.eth.defaultAccount,
              name: this.profileName,
              company: this.profileCompany,
              website: this.profileWebsite,
            })
            .end((err2) => {
              if (err2) {
                console.error('Failed to save profile information. Please try again.'); // eslint-disable-line no-console
              }
            });

          request
            .post('/api/file')
            .send({
              owner: web3.eth.defaultAccount,
              fileDigest: this.fileDigest,
              metadataDigest: this.metadataDigest,
              filename: this.filename,
              name: this.name,
              description: this.description,
              txid: resp,
            })
            .end((err2) => {
              if (err2) {
                console.error('Failed to save file information. Please try again.'); // eslint-disable-line no-console
                return;
              }

              this.$router.push({ path: `/file/0x${this.fileDigest}` });
            });
        });
    },

    dropFile(name, digest) {
      this.filename = name;
      this.name = name;
      this.fileDigest = digest;
      this.metadataDigest = SHA3_256.sha3_256(this.name + this.description + this.fileDigest);
    },

    calculateMetaDigest() {
      this.metadataDigest = SHA3_256.sha3_256(this.name + this.description + this.fileDigest);
    },
  },

  readyForSubmission() {
    return this.fileDigest && this.metadataDigest;
  },

  created() {
    if (web3 === 'undefined') return;
    this.haveAccount = web3.eth.accounts.length > 0;

    request
      .get('/api/profile')
      .query({ address: web3.eth.defaultAccount })
      .end((err, resp) => {
        if (!err && resp.body[0] !== undefined) {
          this.profileName = resp.body[0].name;
          this.profileCompany = resp.body[0].company;
          this.profileWebsite = resp.body[0].website;
        }
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #024669;
  text-decoration: none;
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 25px;
}

label {
  color: #024669;
  font-family: 'Open Sans', sans-serif;
  font-size: 25px;
  display: inline-block;
  width: 140px;
  text-align: right;
}

.digest-label {
  width: 195px;
}

input {
  height: 25px;
  width: 470px;
  border: none;
  border-bottom: 1px solid #024669;
  margin-left: 10px;
  font-size: 15px;
}

textarea {
  width: 470px;
  height: 75px;
  border: none;
  border-bottom: 1px solid #024669;
  margin-top: 5px;
  margin-left: 10px;
  font-size: 15px;
}

span {
  width: 500px;
}

span.code {
  font-family: Monospace;
  font-size: 120%;
}

.add-btn {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 94px;
}

.add-btn:hover {
  cursor: pointer;
}

.add-icon {
  font-size: 60px;
  color: #024669;
}

.full {
  height: 100%;
}

.textarea-lbl {
  vertical-align: top;
  margin-top: 18px;
}

.submit-btn {
  margin-top: 50px;
  width: 150px;
  height: 50px;
  font-family: 'Open Sans', sans-serif;
  font-size: 15px;
  background: #025682;
  background-image: linear-gradient(to bottom, #025682, #024669);
  border-radius: 10px;
  color: #ffffff;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  border: none;
}

.submit-btn:hover {
  background: #025682;
  background-image: linear-gradient(to bottom, #0370a9, #035884);
}
</style>
