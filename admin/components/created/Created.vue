<template>
    <div class="b-created">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Режим создания</h5>
                    <button @click="$router.go(-1)" type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form
                        class="was-validated"
                        @submit="sendData"
                    >
                        <div class="form-group">
                            <label for="href" class="col-form-label">Cсылка на категорию</label>
                            <input 
                                type="text"
                                name="href"
                                class="form-control"
                                id="href"
                                placeholder="/example"
                                required
                            >
                        </div>
                        <div class="form-group">
                            <label for="name" class="col-form-label">Название Категории:</label>
                            <input 
                                type="text"
                                name="name"
                                class="form-control" 
                                id="name"
                                required
                            >
                            <div class="invalid-feedback">Please choose a username.</div>
                        </div>
                        <div class="modal-footer">
                            <button @click="$router.go(-1)" type="button" class="btn btn-secondary">Очистить</button>
                            <input type="submit" @click="this.sendData" class="btn btn-primary" value="Сохранить">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({

    }),
    created() {
        
    },
    mounted() {
        //this.sendData();
    },
    methods: {
        sendData(e) {
            e.preventDefault();

            const form = document.querySelector('form');
            this.data = new FormData(form);

            fetch(`/api/category/`, {
                method: "POST",
                mode: "cors",
                body: this.data
            });
        }
    }
}
</script>

<style>
.b-created {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
}
</style>
