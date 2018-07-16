import Vue from 'vue';
import hello from '../components/hello.vue'

new Vue({
    el: 'body',
    render: h => h(hello)
})

const settings =  {
    method: 'POST',
    mode: 'cors'
}

fetch('/api/test', settings)
    .then(res => res.json())
    .then(json => console.log(json))