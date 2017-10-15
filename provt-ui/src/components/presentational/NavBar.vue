<template>
<nav class="navbar fixed-top navbar-light bg-light">
  <a class="navbar-brand" href="#">Provt</a>
  <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
    <li class="nav-item">
      <router-link to="/">
        <i class="material-icons add-icon">check_circle</i>
        CHECK FILE
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/addfile">
        <i class="material-icons add-icon">note_add</i>
        ADD FILE
      </router-link>
    </li>
  </ul>
</nav>
</template>
