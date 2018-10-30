import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        categories: {},
        error: false,
        success: false,
        preloader: false
    },

    getters: {
        getCategories(state) {
            return state.categories;
        },

        getError(state) {
            return state.error;
        },

        getSuccess(state) {
            return state.success;
        },

        getStatePreloader(state) {
            return state.preloader;
        }
    },

    actions: {
        getAllCategories(context) {
            context.commit("showPreloader");

            const settings = {
                method: "GET",
                mode: "cors"
            };

            fetch("/api/categories", settings)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(json => {
                    context.commit("setAllCategories", json);
                    context.commit("hidePreloader");
                })
                .catch(error =>
                    context.commit("setError", {
                        type: "getAllError",
                        content: "При загрузке всех записей произошла ошибка!",
                        message: error.message
                    })
                );
        },

        createCategory(context, data) {
            context.commit("showPreloader");

            fetch(`/api/category/`, {
                method: "POST",
                mode: "cors",
                body: data
            })
                .then(res => {
                    context.commit("hidePreloader");

                    if (res.ok) {
                        context.commit("getSuccess", {
                            content: "Сохранение категории произошло успешно!"
                        });
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error =>
                    context.commit("setError", {
                        type: "getAllError",
                        content: "При сохранении категории произошла ошибка",
                        message: error.message
                    })
                );
        }
    },

    mutations: {
        setAllCategories(state, data) {
            state.categories = data;
        },

        setError(state, data) {
            state.error = data;
        },

        getSuccess(state, data) {
            state.success = data;
        },

        showPreloader(state) {
            state.preloader = true;
        },

        hidePreloader(state) {
            state.preloader = false;
        }
    }
});

export default store;
