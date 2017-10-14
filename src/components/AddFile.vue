<template>
  <div>

      <div v-if="haveAccount">
          <h2>Accounts</h2>
          <ul>
            <li v-for="(balance, account) in accounts" :key="account">
              <code>{{ account }}</code>: {{ balance }} eth
            </li>
          </ul>
          <p>{{ value }}</p>
          <button v-on:click="callContract">Call</button>
          <div id="drop_zone" v-on:drop="drop_handler" v-on:dragover="dragover_handler" v-on:dragend="dragend_handler">
            <span class="drop_text">Drag your file to this Drop Zone ...</span>
          </div>
      </div>
      <div v-else>
          Create an account on <a href="https://metamask.io/" target="_blank">Metamask</a>
      </div>

  </div>
</template>

<script>
/* global web3 */

const SimpleStore = require('../abi/simple_store');

export default {
  name: 'AddFile',

  data() {
    return {
      accounts: {},
      value: null,
    };
  },

  methods: {
    callContract() {
      if (web3 === 'undefined') return;

      const SimpleStoreContract = web3.eth.contract(SimpleStore).at('0x893173504b95dd72a323ad1cac246b23808924cf');
      SimpleStoreContract.get.call((err, data) => {
        this.value = data;
      });
    },
    drop_handler(ev) {
      console.log('Drop');
      ev.preventDefault();
      // If dropped items aren't files, reject them
      var dt = ev.dataTransfer;
      if (dt.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i=0; i < dt.items.length; i++) {
          if (dt.items[i].kind == "file") {
            var f = dt.items[i].getAsFile();
            console.log("... file[" + i + "].name = " + f.name);
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (var i=0; i < dt.files.length; i++) {
          console.log("... file[" + i + "].name = " + dt.files[i].name);
        }
      }
    },
    dragover_handler(ev) {
      console.log('dragover_handler');
      ev.preventDefault();
    },
    dragend_handler(ev) {
      console.log('dragend_handler');
      var dt = ev.dataTransfer;
      if (dt.items) {
        // Use DataTransferItemList interface to remove the drag data
        for (var i = 0; i < dt.items.length; i++) {
          dt.items.remove(i);
        }
      } else {
        // Use DataTransfer interface to remove the drag data
        ev.dataTransfer.clearData();
      }
    },
  },

  created() {
    if (web3 === 'undefined') return;

    const accounts = web3.eth.accounts;
    const balances = {};


    for (let i = 0; i < accounts.length; i += 1) {
      const account = accounts[i];
      web3.eth.getBalance(account, (err, balance) => {
        balances[account] = web3.fromWei(balance.toNumber(), 'ether');
        this.accounts = balances;
      });
    }

    if (accounts.length > 0) {
        this.haveAccount = true;
    } else {
        this.haveAccount = false;
    }
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
  color: #42b983;
}

#drop_zone {
  border: 1px dashed skyblue;
  width: 70%;
  height: 120px;
  margin-left: 15%;
  margin-top: 20px;
}

.drop_text {
    font-size: 20px;
    position: relative;
    top: 46px;
}
</style>
