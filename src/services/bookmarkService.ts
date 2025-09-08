import axios, { AxiosError, AxiosRequestConfig } from "axios";
import type { Bookmark } from "../stores/bookmarks";
import { useAuth } from "@clerk/vue";

export interface GetAllBookmarksRequest {
  pageNum?: number;
}

const API_BASE_URL =
  import.meta.env.VITE_WEB_API_BASE_URL || "http://localhost:8000";

const getErrorMessage = (error: AxiosError): string => {
  if (!error.response) {
    return "Unable to connect to API server";
  }

  switch (error.response.status) {
    case 400:
      return "Invalid request data";
    case 401:
      return "Authentication required";
    case 403:
      return "You don't have permission to perform this action";
    case 404:
      return "Resource not found";
    case 409:
      return "Bookmark already exists";
    default:
      return "An unexpected error occurred";
  }
};

export function useBookmarkService() {
  // Create axios instance
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { getToken } = useAuth();

  // Add auth interceptor
  api.interceptors.request.use(async (config) => {
    const token = await getToken.value();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // Response interceptor for error handling
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  );

  return {
    async getAll(req?: GetAllBookmarksRequest): Promise<{
      links: Bookmark[];
      totalCount: number;
      totalPages: number;
    }> {
      const config: AxiosRequestConfig = {
        params: { pageNum: req?.pageNum || 0 },
      };

      const response = await api.get("/api/links", config);
      return response.data.data || { links: [], totalCount: 0, totalPages: 0 };
    },

    async getById(id: string): Promise<Bookmark> {
      const response = await api.get(`/api/links/${id}`);
      return response.data.data;
    },

    async create(bookmarkData: Omit<Bookmark, "id">): Promise<Bookmark> {
      const response = await api.post("/api/links", bookmarkData);
      return response.data.data;
    },

    async update(
      id: string,
      bookmarkData: Partial<Omit<Bookmark, "id">>
    ): Promise<Bookmark> {
      const response = await api.put(`/api/links/${id}`, bookmarkData);
      return response.data.data;
    },

    async deleteById(id: string): Promise<void> {
      await api.delete(`/api/links/${id}`);
    },
  };
}
