<template>
  <div id="app" class="container-fluid">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/presentational/NavBar';

export default {
  name: 'app',
  components: {
    navbar: NavBar,
  },
};
</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css';

body {
  height: 100%;
  padding-top: 100px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.info-field label {
  font-weight: bold;
}
</style>
