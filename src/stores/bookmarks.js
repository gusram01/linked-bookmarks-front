import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { bookmarkService } from '../services/bookmarkService'

export const useBookmarkStore = defineStore('bookmarks', () => {
  // State
  const bookmarks = ref([])
  const loading = ref(false)
  const error = ref('')
  const successMessage = ref('')

  // Getters
  const hasBookmarks = computed(() => bookmarks.value.length > 0)
  const bookmarkCount = computed(() => bookmarks.value.length)

  // Actions
  const fetchBookmarks = async () => {
    loading.value = true
    error.value = ''
    
    try {
      const data = await bookmarkService.getAll()
      bookmarks.value = data
    } catch (err) {
      error.value = err.message || 'Failed to load bookmarks'
    } finally {
      loading.value = false
    }
  }

  const createBookmark = async (bookmarkData) => {
    loading.value = true
    error.value = ''
    
    try {
      const newBookmark = await bookmarkService.create(bookmarkData)
      bookmarks.value.push(newBookmark)
      successMessage.value = 'Bookmark created successfully'
      return newBookmark
    } catch (err) {
      error.value = err.message || 'Failed to create bookmark'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateBookmark = async (id, bookmarkData) => {
    loading.value = true
    error.value = ''
    
    try {
      const updatedBookmark = await bookmarkService.update(id, bookmarkData)
      const index = bookmarks.value.findIndex(b => b.id === id)
      if (index !== -1) {
        bookmarks.value[index] = updatedBookmark
      }
      successMessage.value = 'Bookmark updated successfully'
      return updatedBookmark
    } catch (err) {
      error.value = err.message || 'Failed to update bookmark'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteBookmark = async (id) => {
    loading.value = true
    error.value = ''
    
    try {
      await bookmarkService.delete(id)
      bookmarks.value = bookmarks.value.filter(b => b.id !== id)
      successMessage.value = 'Bookmark deleted successfully'
    } catch (err) {
      error.value = err.message || 'Failed to delete bookmark'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getBookmarkById = async (id) => {
    try {
      return await bookmarkService.getById(id)
    } catch (err) {
      error.value = err.message || 'Failed to load bookmark'
      throw err
    }
  }

  const clearMessages = () => {
    error.value = ''
    successMessage.value = ''
  }

  return {
    // State
    bookmarks,
    loading,
    error,
    successMessage,
    // Getters
    hasBookmarks,
    bookmarkCount,
    // Actions
    fetchBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark,
    getBookmarkById,
    clearMessages
  }
})