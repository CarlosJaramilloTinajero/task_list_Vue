<script setup></script>

<template>
    <footer>
        <p class="description-page">
            Sitio web desarrollado por <strong>Carlos Daniel Jaramillo Tinajero.</strong>
        </p>
        <div class="content-footer">
            <div class="tecnologies">
                <p class="title">Lenguajes</p>
                <p class="tecnology">HTML</p>
                <p class="tecnology">CSS</p>
                <p class="tecnology">JavaScript</p>
                <p class="tecnology">PHP</p>
                <p class="tecnology">SQL</p>
            </div>

            <div class="tecnologies">
                <p class="title">Frameworks</p>
                <p class="tecnology">Laravel</p>
                <p class="tecnology">Vue</p>
                <p class="tecnology">BootStrap</p>
            </div>

            <div class="tecnologies">
                <p class="title">Libs / Modulos</p>
                <p class="tecnology">Vuex</p>
                <p class="tecnology">Vue-router</p>
                <p class="tecnology">Toastify</p>
                <p class="tecnology">Axios</p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
footer {
    background-color: rgb(0, 76, 87);
    margin-top: 100px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    padding: 60px 0;
    min-width: 350px;
}

.description-page {
    font-family: 'Nunito', sans-serif;
    color: white;
    font-size: 14px;
    text-align: center;
    margin-bottom: 20px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.content-footer {
    display: flex;
    grid-gap: 30px;
    justify-content: center;
}

.tecnologies .title {
    margin-bottom: 15px;
    color: white;
    text-align: center;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    opacity: .95;
}

.tecnologies .tecnology {
    margin-bottom: 5px;
    color: white;
    text-align: center;
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    opacity: .75;
}
</style>