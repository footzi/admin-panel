<template>
    <div class="b-editor">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Режим изменения</h5>
                    <button @click="$router.go(-1)" type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="name" class="col-form-label">Название Категории:</label>
                            <input 
                                type="text"
                                name="name"
                                class="form-control" 
                                id="recipient-name" 
                                v-bind:value="content.name"
                                v-on:change="getUpdate">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Message:</label>
                            <textarea class="form-control" id="message-text"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button @click="$router.go(-1)" type="button" class="btn btn-secondary">Close</button>
                    <button @click="this.sendUpdate" type="button" class="btn btn-primary">Send message</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: () => ({
        type: "",
        id: "",
        content: "",
        updateData: ""
    }),
    created() {
        this.getData();  
    },
    methods: {
        getData() {
            this.type = this.$route.params.type;
            this.id = this.$route.params.id;

            this.params = `id=${this.id}`;
            this.query = new URLSearchParams(this.params).toString();

            fetch(`/api/${this.type}/?${this.query}`, { mode: "cors" })
                .then(res => res.json())
                .then(json => (this.content = json));
        },
        getUpdate(name) {
            this.updateData = new FormData();
            // что это?
            this.updateData.append(name.target.name, name.target.value);
        },
        sendUpdate() {
            fetch(`/api/category/?${this.query}`, {
                method: "PUT",
                mode: "cors",
                body: this.updateData
            });
        }
    }
};
</script>

<style>
.b-editor {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
}
</style>
