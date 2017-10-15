<template>
    <div id="drop_zone" v-on:drop="dropHandler" v-on:dragover="dragoverHandler" v-on:dragleave="dragleaveHandler" v-bind:class="{ draggedover: over }" >

      <div v-show="isLoading">
        <stretch></stretch></br>
        Validating your file... Hold on tight!
      </div>

      <div v-show="!isLoading">
        <span class="drop_text">Drag and drop your file here</span>
      </div>
    </div>
</template>

<script>
import SHA3_256 from 'js-sha3';
import Stretch from 'vue-loading-spinner/src/components/Stretch';

export default {
  name: 'Drop',

  components: {
    Stretch,
  },

  data() {
    return {
      over: false,
      isLoading: false,
    };
  },

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

      this.isLoading = true;

      fileReader.readAsBinaryString(file);
    },

    dragoverHandler(ev) {
      ev.preventDefault();
      this.over = true;
      this.$emit('dragged-over');
    },

    dragleaveHandler(ev) {
      ev.preventDefault();
      this.over = false;
      this.$emit('dragged-out');
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

    .draggedover {
      background-color: pink;
    }

    .drop_text {
        font-size: 20px;
        position: relative;
        top: 46px;
    }


</style>
