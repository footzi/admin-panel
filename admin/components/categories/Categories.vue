<template>
  <div class="b-categories">
    <h2>Категории товаров:</h2>
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
            <img :src="'../../../uploads/' + category.image_src" :alt=category.name>
            
          <td>
            <button class="btn btn-success">Редактировать</button>
          </td>
          <td>
            <button class="btn btn-danger">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
    data: () => ({ categories: [], errors: [] }),
    created() {
        const settings = {
            method: "GET",
            mode: "cors"
        };

        fetch("/api/categories", settings)
            .then(res => res.json())
            .then(json => (this.categories = json))
            .catch(e => this.errors.push(e));
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

