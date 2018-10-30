<template>
    <transition name="modal">
        <div class="b-modal">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Режим создания</h5>
                        <button @click="$router.go(-1)" type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <transition name="fade">
                        <div  v-if="content" class="modal-body">
                            <form @submit="checkForm">
                                <div class="form-group">
                                    <label for="href" class="col-form-label">Cсылка на категорию</label>
                                    <input 
                                        type="text"
                                        name="href"
                                        class="form-control"
                                        id="href"
                                        placeholder="/example"
                                        v-model="href"
                                    >
                                    <div class="invalid-feedback">Придумайте ссылку для категории</div>
                                </div>
                                <div class="form-group">
                                    <label for="name" class="col-form-label">Название Категории:</label>
                                    <input 
                                        type="text"
                                        name="name"
                                        class="form-control" 
                                        id="name"
                                        v-model="name"
                                    >
                                    <div class="invalid-feedback">Задайте имя категории</div>
                                </div>
                                <div class="form-group">
                                    <label class="col-form-label">Изображение:</label>
                                    <div class="custom-file">
                                        <input @change="sendImage" type="file" class="custom-file-input" id="customFile">
                                        <input type="hidden" name="image_src" :value=imagePath >
                                        <label class="custom-file-label" for="customFile">Choose file</label>
                                    </div>

                                    <transition name="fade">
                                        <div v-if="dangerAlertImage" class="alert alert-danger">
                                            <p>{{ error.title }}</p>
                                            <p>{{ error.content }}</p>
                                        </div>
                                    </transition>

                                    <transition name="fade">
                                        <div v-if="preloaderImage" class="modal-preloader">
                                            <img src="images/preloader.svg" alt="Прелоадер">
                                        </div>
                                    </transition>

                                    <transition name="fade">
                                        <div v-if="imagePath" class="modal-image">
                                            <img class="modal-image" :src=imagePath alt="Превью категории">
                                            <button @click="deleteImage" class="btn btn-danger" >Удалить</button>
                                        </div>
                                    </transition>
                                </div>
                                <div class="modal-footer">
                                    <button type="reset" class="btn btn-secondary">Очистить</button>
                                    <input type="submit" class="btn btn-primary" value="Сохранить">
                                </div>
                            </form>
                        </div>
                    </transition>

                    <div v-if="statePreloader">
                        <preloader></preloader>
                    </div>

                    <div class="modal-alert">
                        <div v-if="successAlert">
                            <success v-bind="successAlert"></success>
                        </div>
                        
                        <div v-if="dangerAlert">
                            <danger v-bind="dangerAlert"></danger>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Preloader from "../preloader/Preloader.vue";
import Success from "../alerts/Success.vue";
import Danger from "../alerts/Danger.vue";

export default {
    components: {
        Preloader,
        Danger,
        Success
    },

    data: () => ({
        href: null,
        name: null,
        //error: { title: "", content: "" },
        content: true,

        //dangerAlert: false,
        preloaderImage: false,
        dangerAlertImage: false,
        imagePath: ""
    }),

    computed: {
        statePreloader() {
            return this.$store.getters.getStatePreloader;
        },

        successAlert() {
            return this.$store.getters.getSuccess;
        },

        dangerAlert() {
            return this.$store.getters.getError;
        }

        // stateContent() {
        //     return true;
        // }
    },

    created() {
        this.$store.commit("hidePreloader");
    },

    watch: {
        statePreloader() {
            this.content = false;
        }
    },

    mounted() {
        this.form = document.querySelector("form");
        this.inputs = this.form.querySelectorAll("input.form-control");
        this.bindEvents();
    },

    methods: {
        /**
         * Отправляет данные из формы на сервер
         */
        sendData() {
            const data = new FormData(this.form);

            this.$store.dispatch("createCategory");
            console.log(this.statePreloader);
        },

        /**
         * Навешивает обработчики на события
         */
        bindEvents() {
            this.inputs.forEach(input => {
                input.addEventListener("change", () => {
                    this.validate();
                });
            });
        },

        /**
         *  Проверка формы и при успехе отправки данных
         */
        checkForm(e) {
            e.preventDefault();
            this.validate();

            if (this.href && this.name) {
                this.sendData();
            }
        },

        /**
         * Простой метод валидации
         */
        validate() {
            if (!this.href) {
                this.form
                    .querySelector("input[name=href]")
                    .classList.add("is-invalid");
            } else {
                this.form
                    .querySelector("input[name=href]")
                    .classList.remove("is-invalid");
            }

            if (!this.name) {
                this.form
                    .querySelector("input[name=name]")
                    .classList.add("is-invalid");
            } else {
                this.form
                    .querySelector("input[name=name]")
                    .classList.remove("is-invalid");
            }
        },

        /**
         * Отправляет и сохраняет загруженное изображение
         */
        sendImage(e) {
            this.preloaderImage = true;
            const file = e.target.files[0];
            const data = new FormData();

            data.append("file", file);
            data.append("folder", "categories");

            fetch(`/api/file/`, {
                method: "POST",
                mode: "cors",
                body: data
            })
                .then(res => {
                    this.preloaderImage = false;

                    if (res.ok) {
                        return res.text();
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(imagePath => {
                    this.imagePath = imagePath;
                })
                .catch(error => {
                    this.error.title = "Ошибка при загрузке изображения";
                    this.error.content = error.message;
                    this.dangerAlertImage = true;
                }); //Нужно воткнуть отображение текста ошибки
        },

        /**
         * Удаляет загруженное изображение
         */
        deleteImage(e) {
            e.preventDefault();

            const data = new FormData();
            data.append("filePath", this.imagePath);

            fetch(`/api/file/`, {
                method: "DELETE",
                mode: "cors",
                body: data
            })
                .then(res => {
                    if (res.ok) {
                        this.imagePath = false;
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => {
                    this.error.title = "Ошибка при удалении изображения";
                    this.error.content = error.message;
                    this.dangerAlertImage = true;
                }); //Нужно воткнуть отображение текста ошибки
        }
    }
};
</script>

<style lang="scss">
@import "../styles/modal.scss";
</style>
