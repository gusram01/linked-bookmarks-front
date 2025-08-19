<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div class="animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" :class="spinnerClass"></div>
    <span v-if="text" class="ml-3 text-gray-600" :class="textClass">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'



const props = defineProps<{
size: string
text: string
}>()

const containerClass = computed(() => {
  return props.size === 'lg' ? 'py-16' : props.size === 'sm' ? 'py-2' : 'py-8'
})

const spinnerClass = computed(() => {
  return props.size === 'lg' ? 'h-12 w-12' : props.size === 'sm' ? 'h-4 w-4' : 'h-8 w-8'
})

const textClass = computed(() => {
  return props.size === 'lg' ? 'text-lg' : props.size === 'sm' ? 'text-sm' : 'text-base'
})


</script>