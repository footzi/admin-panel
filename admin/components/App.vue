<template>
    <div>
        <router-link to="/test">Test</router-link>
        <div class="container b-app">
            <h1>Панель администрирования для сайта flower-bluses.ru</h1>
            <categories></categories>
        </div>
            <router-view></router-view>
    </div>
</template>
<script>
import Categories from "../components/categories/Categories.vue";
import Test from "../components/test/Test.vue";

export default {
    components: {
        Categories,
        Test
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

