<template>
    <transition name="fade">
        <div class="alert alert-danger">
            <p>{{ content }}</p>
            <p>Ответ от сервера: {{ message }}</p>
        </div>
    </transition>
</template>

<script>
export default {
    props: ["content", "message"]
};
</script>
