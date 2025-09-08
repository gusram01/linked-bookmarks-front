<template>

    <nav aria-label="Page navigation">
        <ul class="flex items-center -space-x-px h-10 text-base">
            <li>
                <button
                    @click="prevPage"
                    class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                    <span class="sr-only">Previous</span>
                    <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 1 1 5l4 4" />
                    </svg>
                </button>
            </li>

            <li v-for="page in pages">
                <button
                    @click="changePage(page)"
                    class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                    {{ page  }}
                </button>
            </li>

            <li>
                <button
                    @click="nextPage"
                    class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                    <span class="sr-only">Next</span>
                    <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 9 4-4-4-4" />
                    </svg>
                </button>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    currentPage: {
        type: Number,
    },
    totalPages: {
        type: Number,
        require: true,
    }
})


const pages = computed(() => {
    return Array.from({ length: props.totalPages ?? 0 }, (_, i) => i + 1);
})

const emit = defineEmits<{
    (e: 'pageChange', page: number): void
}>()

const changePage = (page: number) => {
    const toChange = page - 1;

    if (toChange !== props.currentPage) {
        emit('pageChange', toChange);
    }
}

const prevPage = () => {
    const page = props?.currentPage ?? 0;
    if (page > 0) {
        emit('pageChange', page - 1);
    }
}

const nextPage = () => {
    const page = props?.currentPage ?? 0;
    const total = props?.totalPages ?? 1;
    if (page < total - 1) {
        emit('pageChange', page + 1);
    }
}

</script>