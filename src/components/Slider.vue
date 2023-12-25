<script setup>
import { onMounted, ref } from 'vue';

defineProps({
  expandedSlider: {
    type: Boolean,
    default: true
  }
});

const userName = ref('');

onMounted(() => {
  userName.value = localStorage.getItem('user_name');
});
</script>

<template>
  <div class="slider-left">
    <div :class="{ 'opacity-0': !expandedSlider }" style="transition: opacity .8s ease-in-out;">
      <div class="user-space">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-square"
            viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
          </svg>
        </div>
        <p class="name-user">
          Espacio de trabajo de <br>
          {{ userName }}
        </p>
      </div>

      <hr class="mt-0">

      <div class="link-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wallet2"
          viewBox="0 0 16 16">
          <path
            d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
        </svg>
        <router-link class="link" to="/">Tareas archivadas</router-link>
      </div>

      <div class="link-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-view-list"
          viewBox="0 0 16 16">
          <path
            d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2m0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14" />
        </svg>
        <router-link class="link" to="/">Listas archivadas</router-link>
      </div>

      <div class="link-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card"
          viewBox="0 0 16 16">
          <path
            d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
          <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
        </svg>
        <router-link class="link" to="/">Tableros</router-link>
      </div>
    </div>

  </div>
</template>

<style scoped>
.slider-left {
  width: 300px;
  height: 100vh;
  position: fixed;
  top: 55px;
  left: 0;
  z-index: 1000;
  background-color: rgb(0, 88, 102);
}

.slider-left .link-container {
  width: 100%;
  display: flex;
  margin: 5px 0;
  padding: 8px 15px;
  transition: background-color .1s ease-in-out;
  cursor: pointer;
}

.slider-left .link-container:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.slider-left .link-container svg {
  color: white;
  width: 20px;
  height: 20px;
  margin-right: 15px;
}

.slider-left .link-container .link {
  text-decoration: none;
  color: white;
  font-size: 15px;
  font-family: 'Nunito', sans-serif;
}

.slider-left .user-space {
  width: 100%;
  display: flex;
  grid-gap: 10px;
}

.slider-left .user-space .icon {
  padding: 30px 5px 20px 20px;
}

.slider-left .user-space .name-user {
  color: rgba(255, 255, 255, 0.9);
  padding: 20px 0;
  text-align: left;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  margin-bottom: 0;
}

.slider-left .user-space .icon svg {
  color: rgba(255, 255, 255, 0.9);
  width: 33px;
  height: 33px;
}

.slider-left hr {
  color: white;
}
</style>
