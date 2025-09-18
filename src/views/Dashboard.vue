<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header Section -->
    <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">My Bookmarks</h1>
        <p class="text-gray-600">
          {{ hasBookmarks ? `${totalCount} saved ${totalCount === 1 ? 'link' : 'links'}` : 'Manage your saved links' }}
        </p>
      </div>
      <nav class="mt-4 sm:mt-0 flex grow shrink-0 items-center justify-end gap-3 flex-wrap items-stretch">
        <form class="max-w-md w-fit" @submit.prevent="searchBookmarks">
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" v-model.="search"
              class="block w-full p-4 ps-10 pe-24 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search bookmarks..." required />
            <button type="submit"
              class="absolute end-0 top-0 h-full flex items-center justify-center w-20 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md">
              Search
            </button>
          </div>
        </form>

        <router-link to="/bookmark"
          class="flex items-center justify-center text-sm font-medium p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md">
          <span>
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
              </path>
            </svg>
          </span>
          Add Bookmark
        </router-link>
      </nav>
    </header>

    <!-- Messages -->
    <AlertMessage v-if="successMessage" type="success" :message="successMessage" :dismissible="true"
      @dismiss="clearMessages" />

    <AlertMessage v-if="error" type="error" :message="error" :dismissible="true" @dismiss="clearMessages" />

    <p class="my-8" v-if="hasBookmarks && totalPages > 1">
      <Paginator :total-pages="totalPages" :current-page="currentPage" @page-change="changePage" />
    </p>

    <!-- Loading State -->
    <LoadingSpinner v-if="loading" size="lg" text="Loading bookmarks..." />
    <!-- Empty State -->
    <div v-else-if="!hasBookmarks && !error" class="text-center py-16">
      <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No bookmarks yet</h3>
      <p class="text-gray-600 mb-8 max-w-md mx-auto">
        Start building your collection by adding your first bookmark. Save any link you want to remember.
      </p>
      <router-link to="/bookmark"
        class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Add Your First Bookmark
      </router-link>
    </div>


    <!-- Bookmarks Grid -->
    <section v-else-if="hasBookmarks">
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <li v-for="bookmark in screenBookmarks" :key="bookmark.id"
          class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 group grid grid-cols-subgrid gap-2">
          <div class="flex items-start justify-between">
            <div class="flex-1 min-w-0">
              <h3
                class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                {{ bookmark.url }}
              </h3>
              <p v-if="bookmark.summary" class="text-gray-600 text-sm line-clamp-2">
                {{ bookmark.summary }}
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <a :href="bookmark.url" target="_blank" rel="noopener noreferrer"
              class="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium truncate flex-1 mr-4 group-hover:underline">
              <svg class="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              <span class="">
                Visit Link
              </span>
            </a>

            <div class="flex items-center space-x-2">
              <router-link :to="`/bookmark/edit/${bookmark.id}`"
                class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                title="Edit bookmark">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                  </path>
                </svg>
              </router-link>
              <button @click="handleDelete(bookmark.id)"
                class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Delete bookmark">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                  </path>
                </svg>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookmarkStore } from '../stores/bookmarks'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import AlertMessage from '../components/ui/AlertMessage.vue'
import Paginator from '@/components/ui/Paginator.vue'

const bookmarkStore = useBookmarkStore()
const {
  loading,
  error,
  successMessage,
  hasBookmarks,
  totalCount,
  totalPages,
  currentPage,
  screenBookmarks,
  search,
} = storeToRefs(bookmarkStore)

onMounted(() => {
  bookmarkStore.fetchBookmarks()
})

const changePage = (page) => {
  bookmarkStore.setCurrentPage(page)
  bookmarkStore.fetchBookmarks({ pageNum: page })
}

const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this bookmark?')) {
    await bookmarkStore.deleteBookmark(id)
  }
}

const clearMessages = () => {
  bookmarkStore.clearMessages()
}

const searchBookmarks = async () => {
  await bookmarkStore.searchBookmarks()
}
</script>