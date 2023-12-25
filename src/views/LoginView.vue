<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '../router';
import { notify, updateNotify } from '../notify';

const store = useStore();

const idNotify = ref(0);

const credentials = ref({
  name: '',
  password: ''
});

const submit = async () => {
  if (!credentials.value.name || !credentials.value.password) {
    console.log('hola');
    return;
  }

  idNotify.value = notify('Cargando...', 'loading');

  const data = await store.dispatch('login', credentials.value);

  if (data && data.status) {
    router.push('/');
    updateNotify(idNotify.value, 'Logeado correctamente', 'success');
    return;
  }
  updateNotify(idNotify.value, 'Las credenciales proporcionado no coinciden.', 'error');
};
</script>

<template>
  <div class="container-form">
    <p class="title">Login</p>
    <form @submit.prevent="submit">
      <div class="form-floating mb-4">
        <input type="text" v-model="credentials.name" class="form-control" placeholder="Nombre" id="floatingTextareaName">
        <label for="floatingTextareaName">Nombre</label>
      </div>

      <div class="form-floating mb-4">
        <input v-model="credentials.password" type="password" class="form-control" placeholder="Contraseña"
          id="floatingTextareaPassword">
        <label for="floatingTextareaPassword">Contraseña</label>
      </div>

      <div class="mt-3 d-flex justify-content-center">
        <div class="d-block">
          <div class="d-flex justify-content-center mb-4">
            <button type="submit" class="btn btn-primary btn-sm"><span>Ingresar</span></button>
          </div>
          <p class="text-center footer">
            ¿No tienes cuenta? <br>
            <router-link class="router-link" to="register">Crea una cuenta</router-link>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
