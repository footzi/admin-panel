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
                                <div class="modal-footer">
                                    <button type="reset" class="btn btn-secondary">Очистить</button>
                                    <input type="submit" class="btn btn-primary" value="Сохранить">
                                </div>
                            </form>
                        </div>
                    </transition>

                    <transition name="fade">
                        <div v-if="preloader" class="modal-preloader">
                            <!-- https://loading.io/# -->
                            <img src="images/preloader.svg" alt="Прелоадер">
                        </div>
                    </transition>

                    <div class="modal-alert">
                        <transition name="fade">
                            <div v-if="successAlert" class="alert alert-success">
                                Категория успешно сохранена!
                            </div>
                        </transition>

                        <transition name="fade">
                            <div v-if="dangerAlert" class="alert alert-danger">
                                Ошибка сохранения!
                                <p> {{error}}</p>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data: () => ({
        href: null,
        name: null,
        error: "",
        content  : true,
        preloader: false,
        successAlert: false,
        dangerAlert: false,
    }),
    created() {},
    mounted() {
        this.form = document.querySelector("form");
        this.inputs = this.form.querySelectorAll("input");
        this.bindEvents();
    },
    methods: {
        /**
         * Отправляет данные из формы на сервер
         */
        sendData() {
            this.data = new FormData(this.form);
            this.content = false;
            this.preloader = true;

            fetch(`/api/category/`, {
                method: "POST",
                mode: "cors",
                body: this.data
            })
                .then(res => {
                    this.preloader = false;

                    if (res.ok) {
                        this.successAlert = true;
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => {
                    this.error = error.message;
                    this.dangerAlert = true;
                });
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
        }
    }
};
</script>

<style lang="scss">
@import "../styles/modal.scss";
</style>
