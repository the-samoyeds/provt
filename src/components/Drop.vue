<template>
    <div id="drop_zone" v-on:drop="dropHandler" v-on:dragover="dragoverHandler">
      <span class="drop_text">Drag and drop your file here</span>
    </div>
</template>

<script>
export default {
  name: 'Drop',
  methods: {
      dropHandler(ev) {
          ev.preventDefault();
          this.$emit('dropped', ev);
      },
      dragoverHandler(ev) {
          ev.preventDefault();
          this.$emit('dragged-over');
      },
  }
};
</script>

<style>
    #drop_zone {
      border: 1px dashed skyblue;
      width: 80%;
      height: 120px;
      margin-left: 10%;
      margin-top: 20px;
    }

    .drop_text {
        font-size: 20px;
        position: relative;
        top: 46px;
    }
</style>
