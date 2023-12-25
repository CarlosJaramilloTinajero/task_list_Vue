<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '../router';
import { notify, updateNotify } from '../notify';

const store = useStore();

const idNotify = ref(0);

const userForm = ref({
  name: '',
  email: '',
  password: ''
});

const submit = async () => {
  if (!userForm.value.name || !userForm.value.password || !userForm.value.email) {
    return;
  }

  idNotify.value = notify('Cargando...', 'loading');

  const data = await store.dispatch('register', userForm.value);

  if (data && data.status) {
    router.push('/'); 
    updateNotify(idNotify.value, 'Logeado correctamente', 'success');
    return;
  }
  // Explicar el mensaje de error
  updateNotify(idNotify.value, 'Error al crear al usuario', 'error');
};
</script>

<template>
  <div class="container-form">
    <p class="title">Registro</p>
    <form @submit.prevent="submit">
      <div class="form-floating mb-4">
        <input type="text" v-model="userForm.name" class="form-control" placeholder="Nombre" id="floatingTextareaName">
        <label for="floatingTextareaName">Nombre</label>
      </div>

      <div class="form-floating mb-4">
        <input type="email" v-model="userForm.email" class="form-control" placeholder="Nombre" id="floatingTextareaEmail">
        <label for="floatingTextareaEmail">Email</label>
      </div>

      <div class="form-floating mb-4">
        <input type="password" v-model="userForm.password" class="form-control" placeholder="Contraseña"
          id="floatingTextareaPassword">
        <label for="floatingTextareaPassword">Contraseña</label>
      </div>

      <div class="mt-3 d-flex justify-content-center">
        <div class="d-block">
          <div class="d-flex justify-content-center mb-4">
            <button type="submit" class="btn btn-primary btn-sm"><span>Registrarse</span></button>
          </div>
          <p class="text-center footer">
            ¿Ya tienes cuenta? <br>
            <router-link class="router-link" to="login">Ingresar</router-link>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
