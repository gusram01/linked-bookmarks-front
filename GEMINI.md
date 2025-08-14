
# Project Overview

This is a bookmark manager application built with [Astro](https://astro.build/). It uses [Tailwind CSS](https://tailwindcss.com/) for styling and [Clerk](https://clerk.com/) for user authentication. The application allows users to save, organize, and manage their bookmarks.

The frontend is an Astro project that uses server-side rendering with a Node.js adapter. It communicates with a separate backend API to handle bookmark data.

## Key Technologies

*   **Frontend:** Astro
*   **Styling:** Tailwind CSS
*   **Authentication:** Clerk
*   **Backend:** (Assumed) A separate API server running on `http://localhost:4200`

# Building and Running

To get the project up and running, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the Astro development server, typically on `http://localhost:4321`.

3.  **Build for production:**
    ```bash
    npm run build
    ```
    This will create a production-ready build of the application in the `dist/` directory.

4.  **Preview the production build:**
    ```bash
    npm run preview
    ```

**Note:** This project requires a separate backend API server running on `http://localhost:4200` for full functionality. The API is responsible for handling bookmark data.

# Development Conventions

*   **Styling:** The project uses Tailwind CSS for styling. Utility classes are used directly in the Astro components.
*   **Authentication:** User authentication is handled by Clerk. The `@clerk/astro` library is used to integrate Clerk into the application.
*   **API Communication:** The frontend communicates with the backend API using `fetch`. The API endpoints are assumed to be available at `http://localhost:4200/api/`.
*   **Code Structure:** The main application code is located in the `src/` directory.
    *   `src/pages/`: Contains the pages of the application.
    *   `src/layouts/`: Contains the layout components.
    *   `src/pages/api/`: Contains the API routes for handling bookmark operations.
