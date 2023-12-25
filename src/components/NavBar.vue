<script setup>
import router from '../router';
import { onMounted, ref } from 'vue';

let userName = ref('');

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user_name');
  router.push('login');
};

onMounted(() => {
  userName.value = localStorage.getItem('user_name');
  if (userName.value) {
    userName.value = userName.value.split(' ');
    userName.value = userName.value[0]; ''
  }
});


</script>

<template>
  <nav class="navbar-menu">
    <div class="user-container">
      <div class="button-drop">
        <span class="d-flex justify-content-center">
          <img :src="'https://ui-avatars.com/api/?name=' + userName + '&size=200&background=cbcbcb'" alt="user-icon" class="rounded-circle">
        </span>
      </div>

      <div class="toggle-drop"></div>

      <div class="drop-container">
        <div class="links">
          <p class="link" @click="logout">Logout</p>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-menu {
  width: 100vw;
  display: flex;
  height: 55px;
  background-color: rgb(0, 98, 113);
  /* background-color: #cbcbcb; */
  position: fixed;
  z-index: 100;
  box-shadow: 0 0 10px rgba(0, 0, 0, .3);
  /* border-bottom: 1px white solid; */
}

.navbar-menu .user-container {
  position: absolute;
  top: 12px;
  right: 10px;
  z-index: 1002;
}

.navbar-menu .user-container .toggle-drop {
  width: 230px;
  background-color: transparent;
  height: 30px;
  position: absolute;
  top: 25px;
  left: -195px;
  display: none;
  z-index: 1000
}

.user-container:hover .toggle-drop {
  display: block;
}

.navbar-menu .user-container .button-drop {
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.navbar-menu .user-container .button-drop img {
  width: 100%;
  height: 100%;
}

.user-container .drop-container {
  width: 280px;
  padding: 20px 0;
  background-color: white;
  position: absolute;
  top: 35px;
  left: -245px;
  z-index: 1000;
  display: none;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .3);
}

.drop-container .links {
  width: 100%;
}

.drop-container .links .link {
  margin: 0 0 0 0;
  cursor: pointer;
  color: black;
  font-family: 'Plus Jakarta Sans', sans-serif;
  widows: 100%;
  transition: background-color .2s ease-in-out;
  padding: 8px;
  font-size: 15px;
}

.drop-container .links .link:hover {
  background-color: rgba(0, 0, 0, .1);
}

.user-container:hover .drop-container {
  display: block;
}
</style>
