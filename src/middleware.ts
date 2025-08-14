import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server"

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/bookmarks(.*)", "/api/links(.*)"])

export const onRequest = clerkMiddleware((auth, context, next) => {
  if (isProtectedRoute(context.request) && !auth().userId) {
    return auth().redirectToSignIn()
  }

  return next()
})
