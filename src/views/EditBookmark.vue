<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center mb-4">
        <router-link
          to="/dashboard"
          class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 mr-3"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </router-link>
        <h1 class="text-3xl font-bold text-gray-900">Edit Bookmark</h1>
      </div>
      <p class="text-gray-600">Update your bookmark details</p>
    </div>

    <!-- Messages -->
    <AlertMessage
      v-if="error"
      type="error"
      :message="error"
      :dismissible="true"
      @dismiss="clearMessages"
    />

    <!-- Loading State -->
    <LoadingSpinner v-if="initialLoading" size="lg" text="Loading bookmark..." />

    <!-- Bookmark Form -->
    <div v-else-if="bookmark" class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <form @submit.prevent="handleSubmit">
        <div class="mb-6">
          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            v-model="form.title"
            type="text"
            id="title"
            name="title"
            class="block w-full px-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            required
            :disabled="loading"
          />
        </div>

        <div class="mb-6">
          <label for="url" class="block text-sm font-medium text-gray-700 mb-2">
            URL
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
            </div>
            <input
              v-model="form.url"
              type="url"
              id="url"
              name="url"
              class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
              :disabled="loading"
            />
          </div>
        </div>

        <div class="mb-6">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            v-model="form.description"
            id="description"
            name="description"
            rows="4"
            class="block w-full px-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
            placeholder="Optional description for your bookmark"
            :disabled="loading"
          ></textarea>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            :disabled="loading"
            class="flex-1 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
          >
            <LoadingSpinner v-if="loading" size="sm" class="mr-2" />
            <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {{ loading ? 'Updating...' : 'Update Bookmark' }}
          </button>
          <router-link
            to="/dashboard"
            class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-xl border border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </router-link>
        </div>
      </form>
    </div>

    <!-- Not Found State -->
    <div v-else class="text-center py-16">
      <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Bookmark not found</h3>
      <p class="text-gray-600 mb-8">
        The bookmark you're looking for doesn't exist or has been removed.
      </p>
      <router-link
        to="/dashboard"
        class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Dashboard
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useBookmarkStore } from '../stores/bookmarks'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import AlertMessage from '../components/ui/AlertMessage.vue'

const route = useRoute()
const router = useRouter()
const bookmarkStore = useBookmarkStore()
const { loading, error } = storeToRefs(bookmarkStore)

const bookmark = ref(null)
const initialLoading = ref(true)

const form = reactive({
  title: '',
  url: '',
  description: ''
})

onMounted(async () => {
  try {
    const bookmarkData = await bookmarkStore.getBookmarkById(route.params.id)
    bookmark.value = bookmarkData
    
    // Populate form
    form.title = bookmarkData.title || ''
    form.url = bookmarkData.url || ''
    form.description = bookmarkData.description || ''
  } catch (err) {
    // Error handled by store
  } finally {
    initialLoading.value = false
  }
})

const handleSubmit = async () => {
  if (!form.url || !form.title) return

  try {
    await bookmarkStore.updateBookmark(route.params.id, {
      title: form.title,
      url: form.url,
      description: form.description
    })
    router.push('/dashboard')
  } catch (err) {
    // Error is handled by the store
  }
}

const clearMessages = () => {
  bookmarkStore.clearMessages()
}
</script>