import Vue from 'vue';
import hello from '../components/hello.vue'

new Vue({
    el: 'body',
    render: h => h(hello)
})