<template>
    <div>
        <transition name="fade">
            <img v-if="!load" src="images/preloaderItem.svg" class="b-preloader-item" alt="Прелоадер">
        </transition>

        <transition name="fade">
            <div v-show="load">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    data: () => ({
        icon: "",
        target: "",
        load: false
    }),
    mounted() {
        this.getElements();
        this.loadImages();
    },
    methods: {
        getElements() {
            this.icon = this.$el.querySelector(".b-preloader-item");
            this.target = this.$el.querySelector("img:not(.b-preloader-item)");
        },

        loadImages() {
            this.target.addEventListener("load", () => {
                this.load = true;
            });
        }
    }
};
</script>
<style>
.b-preloader-item {
    width: 100%;
    height: 50px;
    text-align: center;
}
</style>
