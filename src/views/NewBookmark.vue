<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center mb-4">
        <h1 class="text-3xl font-bold text-gray-900">Add New Bookmark</h1>
      </div>
      <p class="text-gray-600">Save a link to your bookmark collection</p>
    </div>

    <!-- Messages -->
    <AlertMessage
      v-if="error"
      type="error"
      :message="error"
      :dismissible="true"
      @dismiss="clearMessages"
    />

    <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <form @submit.prevent="handleSubmit">
        <div class="mb-6">
          <label for="url" class="block text-sm font-medium text-gray-700 mb-2">
            Website URL
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
              placeholder="https://example.com"
              required
              :disabled="loading"
            />
          </div>
          <p class="mt-2 text-sm text-gray-500">
            Enter the URL of the website you want to bookmark
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            :disabled="loading || !form.url"
            class="flex-1 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
          >
            <LoadingSpinner v-if="loading" size="sm" class="mr-2" />
            <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
            </svg>
            {{ loading ? 'Saving...' : 'Save Bookmark' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useBookmarkStore } from '../stores/bookmarks'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import AlertMessage from '../components/ui/AlertMessage.vue'

const router = useRouter()
const bookmarkStore = useBookmarkStore()
const { loading, error } = storeToRefs(bookmarkStore)

const form = reactive({
  url: ''
})

const handleSubmit = async () => {
  if (!form.url) return

  try {
    await bookmarkStore.createBookmark({ url: form.url })
    router.push('/dashboard')
  } catch (err) {
    // Error is handled by the store
  }
}

const clearMessages = () => {
  bookmarkStore.clearMessages()
}
</script>