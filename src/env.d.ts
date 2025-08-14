/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    auth: () => {
      userId: string | null
      user: any
    }
  }
}
