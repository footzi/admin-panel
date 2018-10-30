<template>
    <div class="b-categories">
        <h2>Категории товаров:</h2>
        <router-link :to="`/created`" tag="button" class="btn btn-success" data-toggle="modal" data-target="exampleModalCenter">Cоздать новую категорию</router-link>
        <table class="table table-hover b-table">
            <thead>
                <tr>
                    <td>id</td>
                    <td>href</td>
                    <td>name</td>
                    <td>image</td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categories" :key="category.id">
                    <td>{{category.id}}</td>
                    <td>{{category.href}}</td>
                    <td>{{category.name}}</td>
                    <td>
                        <preloader-item>
                            <img class="b-categories__images" :src="category.image_src" :alt=category.name>
                        </preloader-item>
                    <td>
                        <router-link :to="`/editor/category/${category.id}`" tag="button" class="btn btn-success">Редактировать</router-link>
                    </td>
                    <td>
                        <router-link :to="`/editor/category/${category.id}`" tag="button" class="btn btn-danger">Удалить</router-link>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="statePreloader">
            <preloader></preloader>
        </div>

        <div v-if="getAllError">
            <danger v-bind="getAllError"></danger>
        </div>
    </div>
	
</template>
<script>
import Preloader from "../preloader/Preloader.vue";
import PreloaderItem from "../preloader/PreloaderItem.vue";
import Danger from "../alerts/Danger.vue";

export default {
    components: {
        Danger,
        Preloader,
        PreloaderItem
    },

    data: () => ({
        getAllError: "",
        getOneError: "" //Разные типы ошибок
    }),

    computed: {
        categories: function() {
            return this.$store.getters.getCategories;
        },
        error() {
            return this.$store.getters.getError;
        },
        statePreloader() {
            return this.$store.getters.getStatePreloader;
        }
    },

    created() {
        this.getData();
    },

    watch: {
        error() {
            if (this.error.type === "getAllError") {
                this.getAllError = this.error;
            }
        }
    },

    methods: {
        getData() {
            this.$store.dispatch("getAllCategories");
        }
    }
};
</script>
<style lang="scss">
.b-categories {
    margin-top: 50px;
}
/* вынести в отдельный сss компонент */
.b-table {
    text-align: left;

    img {
        max-width: 100px;
    }
}
</style>

