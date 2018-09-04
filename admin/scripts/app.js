import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import App from "../components/App.vue";
import Editor from "../components/editor/Editor.vue";
import Created from "../components/created/Created.vue";

const routes = [
    {
        path: "/editor/:type/:id",
        component: Editor
    },
    {
        path: "/created",
        component: Created
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

Vue.use(VueRouter);

new Vue({
    router,
    el: "#app",
    render: h => h(App)
});
