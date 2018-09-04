<template>
    <div>
        <div class="container b-app">
            <h1>Панель администрирования для сайта flower-bluses.ru</h1>
            <categories></categories>
        </div>
            <router-view></router-view>
    </div>
</template>
<script>
import Categories from "../components/categories/Categories.vue";

export default {
    components: {
        Categories
    }
};
</script>
<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";

.b-app {
    margin-top: 50px;
    text-align: center;
}
</style>

