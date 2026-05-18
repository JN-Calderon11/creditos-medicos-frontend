# Toast System Fix — Design Spec

**Date:** 2026-05-17  
**Status:** Approved  
**Scope:** Fix bugs in the toast notification system and move it to the app root for global availability.

---

## Problem Summary

Three bugs prevent the toast from working on the login page:

1. `Toast` component is imported in TypeScript in `login.ts` but never added to the `@Component` `imports` array — Angular ignores it.
2. `<app-toast>` is absent from `login.html` — the component has no mounting point.
3. `errorMessage` signal is never set with an actual value in the error path — the inline error box in `login.html` always stays hidden.

Additionally, two dead imports (`Card`, `TextField`) exist in `login.ts` with no usage.

---

## Design

### Architecture

The `ToastService` is already `providedIn: 'root'`, making it a singleton available application-wide. The `Toast` display component should therefore live in the root component (`app.ts` / `app.html`), not inside individual page components. This matches the existing pattern of `<app-alerts />` already present in `app.html`.

### Changes

#### `src/app/app.ts`
- Add `Toast` to the `imports` array of `@Component`.

#### `src/app/app.html`
- Add `<app-toast />` as a sibling of `<app-alerts />`.

#### `src/app/features/auth/pages/login/login.ts`
- Remove TypeScript import of `Toast` (no longer needed in this file).
- Remove TypeScript imports of `Card` and `TextField` (dead code, never used).
- In the error path of `submit()`, add `this.errorMessage.set('Credenciales inválidas')` so the inline error box renders correctly.
- `ToastService` and `ToastType` imports remain — the login still calls `toast.show(...)`.

#### `src/app/features/auth/pages/login/login.html`
- No changes. The `@if (errorMessage())` block is already correctly positioned; it just needed the signal to be populated.

### Error Behavior (after fix)

| Event | Toast | Error box |
|---|---|---|
| Credenciales inválidas | "Credenciales inválidas" (rojo) | "Credenciales inválidas" (inline) |
| Login exitoso | "Bienvenido changuito" (verde) | Oculto (errorMessage = null) |

### Data Flow

```
User submits form
  → submit() called
  → errorMessage.set(null)          ← resets error box
  → [invalid credentials]
      → toast.show('Credenciales inválidas', Error)   ← toast via service
      → errorMessage.set('Credenciales inválidas')    ← error box
  → [valid credentials]
      → toast.show('Bienvenido changuito', Success)   ← toast via service
      → router.navigateByUrl('/home')
```

---

## Out of Scope

- Connecting the actual API (`authService.login()` is commented out — not touched here).
- Styling or visual changes to the toast or error box.
- Adding toast support to other pages.
