import { defineStore } from "pinia";
import { ref, computed, effect } from "vue";
import { useBookmarkService } from "../services/bookmarkService";

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  summary: string;
  attempts: number;
  tags: string[];
}

export interface BookmarkResponse {
  links: Bookmark[];
  totalCount: number;
}

export const useBookmarkStore = defineStore("bookmarks", () => {
  // State
  const searchedBookmarks = ref<Bookmark[]>([]);
  const bookmarks = ref<Bookmark[]>([]);
  const search = ref("");
  const totalCount = ref(0);
  const totalPages = ref(0);
  const currentPage = ref(0);
  const loading = ref(false);
  const error = ref("");
  const successMessage = ref("");

  // Getters
  const hasBookmarks = computed(() => totalCount.value > 0);
  const hasSearch = computed(() => search.value.trim().length > 0);
  const screenBookmarks = computed(() => {
    return hasSearch.value ? searchedBookmarks.value : bookmarks.value;
  });

  effect(() => {
    if (!search.value) {
      searchedBookmarks.value = [];
    }
  });

  const { getAll, create, update, deleteById, getById, searchBy } =
    useBookmarkService();

  // Actions
  const fetchBookmarks = async (req?: { pageNum?: number }) => {
    loading.value = true;
    error.value = "";

    try {
      const data = await getAll(req);
      bookmarks.value = data.links;
      totalCount.value = data.totalCount;
      totalPages.value = data.totalPages;
    } catch (err: any) {
      error.value = err.message || "Failed to load bookmarks";
    } finally {
      loading.value = false;
    }
  };

  const searchBookmarks = async () => {
    loading.value = true;
    error.value = "";
    const query = search.value.trim();

    if (!query) {
      searchedBookmarks.value = [];
      loading.value = false;
      return;
    }

    try {
      const data = await searchBy(query);
      searchedBookmarks.value = data.links;
      
    } catch (err: any) {
      error.value = err.message || "Failed to search bookmarks";
    } finally {
      loading.value = false;
    }
  };

  const setCurrentPage = (page: number) => {
    currentPage.value = page;
  };

  const createBookmark = async (bookmarkData: Omit<Bookmark, "id">) => {
    loading.value = true;
    error.value = "";

    try {
      const newBookmark = await create(bookmarkData);
      bookmarks.value.push(newBookmark);
      successMessage.value = "Bookmark created successfully";
      return newBookmark;
    } catch (err: any) {
      error.value = err.message || "Failed to create bookmark";
      // throw err
    } finally {
      loading.value = false;
    }
  };

  const updateBookmark = async (
    id: string,
    bookmarkData: Partial<Omit<Bookmark, "id">>
  ) => {
    loading.value = true;
    error.value = "";

    try {
      const updatedBookmark = await update(id, bookmarkData);
      const index = bookmarks.value.findIndex((b) => b.id === id);
      if (index !== -1) {
        bookmarks.value[index] = updatedBookmark;
      }
      successMessage.value = "Bookmark updated successfully";
      return updatedBookmark;
    } catch (err: any) {
      error.value = err.message || "Failed to update bookmark";
      // throw err
    } finally {
      loading.value = false;
    }
  };

  const deleteBookmark = async (id: string) => {
    loading.value = true;
    error.value = "";

    try {
      await deleteById(id);
      bookmarks.value = bookmarks.value.filter((b) => b.id !== id);
      successMessage.value = "Bookmark deleted successfully";
    } catch (err: any) {
      error.value = err.message || "Failed to delete bookmark";
      // throw err
    } finally {
      loading.value = false;
    }
  };

  const getBookmarkById = async (id: string) => {
    try {
      return await getById(id);
    } catch (err: any) {
      error.value = err.message || "Failed to load bookmark";
      // throw err
    }
  };

  const clearMessages = () => {
    error.value = "";
    successMessage.value = "";
  };

  return {
    // State
    bookmarks,
    searchedBookmarks,
    search,
    loading,
    error,
    screenBookmarks,
    successMessage,
    totalCount,
    totalPages,
    currentPage,
    // Getters
    hasBookmarks,
    hasSearch,
    // Actions
    fetchBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark,
    getBookmarkById,
    clearMessages,
    setCurrentPage,
    searchBookmarks,
  };
});
