<template>
    <div id="drop_zone" v-on:drop="dropHandler" v-on:dragover="dragoverHandler">
      <span class="drop_text">Drag and drop your file here</span>
    </div>
</template>

<script>
import SHA3_256 from 'js-sha3';

export default {
  name: 'Drop',
  methods: {
    dropHandler(ev) {
      ev.preventDefault();
      const file = ev.dataTransfer.files[0];

      const fileReader = new FileReader();

      // FileReader is muy async.
      const self = this;
      fileReader.onloadend = function onloadend() {
        self.$emit('dropped', file.name, SHA3_256.sha3_256(this.result));
      };

      fileReader.readAsBinaryString(file);
    },

    dragoverHandler(ev) {
      ev.preventDefault();
      this.$emit('dragged-over');
    },
  },
};
</script>

<style>
    #drop_zone {
      border: 1px dashed skyblue;
      width: 80%;
      height: calc(100% - 130px);
      margin-left: 10%;
      margin-top: 20px;
    }

    .drop_text {
        font-size: 20px;
        position: relative;
        top: 46px;
    }
</style>
