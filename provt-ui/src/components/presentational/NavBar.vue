<template>
<nav class="navbar fixed-top navbar-light bg-light">
  <a class="navbar-brand header-title" href="#">Provt
    <img src="../../assets/logo.png" class="logo">
  </a>

  <ul class="navbar-nav header-menu mt-2 mt-lg-0 ">
    <li class="nav-item menu-option">
      <router-link to="/addfile">
        <i class="material-icons icon">note_add</i>
        ADD FILE
      </router-link>
    </li>
    <li class="nav-item menu-option">
      <router-link to="/">
        <i class="material-icons icon">check_circle</i>
        CHECK FILE
      </router-link>
    </li>
  </ul>
</nav>
</template>

<style>
.header-title {
  width: 65px;
  margin: 0 auto;
  font-weight: bold;
  font-size: 30px;
  color: rgb(85, 69, 115) !important;
}

.logo {
  width: 40px;
  height: auto;
  margin-top: -4px;
}

.header-menu {
  position: absolute;
  right: 0;
  top: 24px;
  display: inline;
}

.menu-option {
  float: right;
  margin-right: 25px;
}

.icon {
  vertical-align: middle;
}

</style>
