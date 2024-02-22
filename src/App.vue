<script setup>
import router from './router';
import { ref, computed, onMounted } from 'vue';
import NavBar from './components/NavBar.vue';
import Slider from './components/Slider.vue';
import Footer from './components/Footer.vue';
import { useStore } from 'vuex';

const store = useStore();
const canShowNavbar = ref(['home', 'task-archived', 'list-archived']);

const showNavBar = computed(() => {
  const routerName = router.currentRoute.value.name;
  return canShowNavbar.value.includes(routerName);
});

const expandedSlider = ref(true);

onMounted(() => {
  store.dispatch('enter');
});

</script>

<template>
  <NavBar v-if="showNavBar"></NavBar>
  <div class="click-expand-left-slider slider-left" :style="{ left: expandedSlider ? '277px' : '2px' }" v-if="showNavBar"
    @click="expandedSlider = !expandedSlider">
    <svg v-if="expandedSlider" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
      class="bi bi-caret-left-fill" viewBox="0 0 16 16">
      <path
        d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
    </svg>

    <svg v-if="!expandedSlider" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
      class="bi bi-caret-right-fill" viewBox="0 0 16 16">
      <path
        d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
    </svg>
  </div>
  <Slider class="slider-left" :expandedSlider="expandedSlider" v-if="showNavBar"
    :style="{ left: expandedSlider ? '0' : '-280px' }"></Slider>
  <!-- <div class="container-body"> -->
  <div class="slider-left" :style="{ marginLeft: expandedSlider ? '300px' : '20px' }">
    <div class="container-view">
      <router-view></router-view>
    </div>
    <Footer v-if="showNavBar"></Footer>
  </div>
  <!-- </div> -->
</template>

<style scoped>
.slider-left {
  transition: left .5s ease-in-out, margin-left .5s ease-in-out;
}

.container-view {
  padding-top: 55px;
}

.click-expand-left-slider {
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  background-color: rgb(0, 63, 72);
  top: 60px;
  left: 277px;
  width: 30px;
  height: 30px;
  z-index: 1001;
  cursor: pointer;
}

.click-expand-left-slider svg {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
