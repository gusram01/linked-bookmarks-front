<template>

    <div class="max-w-3xl mx-auto flex items-center justify-center pt-12">
        <SignUp sign-in-url="/sign-in" />
    </div>

</template>

<script setup lang="ts">
import { SignUp } from '@clerk/vue';
</script>