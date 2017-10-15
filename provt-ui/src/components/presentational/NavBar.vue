<template>
<nav class="navbar fixed-top navbar-light bg-light">
  <a class="navbar-brand header-title" href="#">Provt</a>
  <ul class="navbar-nav header-menu mt-2 mt-lg-0 ">
    <li class="nav-item menu-option">
      <router-link to="/">
        <i class="material-icons add-icon">check_circle</i>
        <span class="menu-text">CHECK FILE</span>
      </router-link>
    </li>
    <li class="nav-item menu-option">
      <router-link to="/addfile">
        <i class="material-icons add-icon">note_add</i>
        ADD FILE
      </router-link>
    </li>
  </ul>
</nav>
</template>

<style>
.header-title {
  width: 65px;
  margin: 0 auto;
}

.header-menu {
  position: absolute;
  right: 0;
  display: inline;
}

.menu-option {
  float: right;
  margin-right: 25px;
}

.menu-text {
  margin-top: -5px;
}
</style>
