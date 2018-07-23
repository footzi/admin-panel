import Vue from "vue";
import test from "../components/test/test.vue";

new Vue({
  el: "body",
  render: h => h(test)
});

const settings = {
  method: "POST",
  mode: "cors"
};

fetch("/api/test", settings)
  .then(res => res.json())
  .then(json => console.log(json));
