# Linked Marks - Vue.js 3 SPA

A modern bookmark manager built with Vue.js 3, featuring a clean SPA architecture with strong separation of concerns.

## 🚀 Tech Stack

- **Frontend**: Vue.js 3 (Composition API)
- **State Management**: Pinia
- **Routing**: Vue Router
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Build Tool**: Vite

## 🏗️ Architecture

### Strong SPA Architecture
- **Component-based**: Modular, reusable components
- **State Management**: Centralized state with Pinia stores
- **Service Layer**: Dedicated API service layer
- **Route Guards**: Authentication protection
- **Separation of Concerns**: Clear separation between logic, presentation, and data

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Footer)
│   └── ui/             # Generic UI components
├── views/              # Page components
├── stores/             # Pinia stores for state management
├── services/           # API service layer
├── router/             # Vue Router configuration
└── main.js            # Application entry point
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   ```
   Update the environment variables with your Clerk keys and API URL.

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Environment Variables
- `VITE_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
- `VITE_WEB_API_BASE_URL`: Backend API base URL

### Key Features
- **Authentication**: Secure user authentication with Clerk
- **Responsive Design**: Mobile-first responsive design
- **Real-time Updates**: Reactive state management
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Proper loading indicators
- **Route Protection**: Protected routes for authenticated users

## 📱 Features

- **Dashboard**: View and manage all bookmarks
- **Add Bookmarks**: Quick bookmark creation
- **Edit Bookmarks**: Update bookmark details
- **Delete Bookmarks**: Remove unwanted bookmarks
- **Responsive UI**: Works on all device sizes
- **User Authentication**: Secure login/logout

## 🎨 Design System

- **Typography**: Inter font family
- **Colors**: Blue and purple gradient theme
- **Spacing**: 8px grid system
- **Components**: Consistent, accessible UI components
- **Animations**: Smooth transitions and hover effects

## 🔒 Security

- JWT-based authentication via Clerk
- Protected API routes
- Secure token handling
- CORS configuration

This Vue.js 3 SPA provides a solid foundation for long-term development with modern best practices and scalable architecture.