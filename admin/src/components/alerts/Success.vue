<template>
    <transition name="fade">
        <div class="alert alert-success">
            {{ content }}
        </div>
    </transition>
</template>

<script>
export default {
    props: ["content"]
};
</script>