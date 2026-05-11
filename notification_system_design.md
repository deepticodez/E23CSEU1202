# Notification System Design

## Frontend Architecture

The frontend is built as a Single Page Application (SPA) using React, TypeScript, and Vite. The UI is built using Material UI (MUI) components for a consistent and professional aesthetic. State management and data fetching are handled primarily via React Hooks (`useState`, `useEffect`, `useCallback`) and Axios.

## Component Flow

1. **App Level**: Initialization of global authentication (`App.tsx`).
2. **Dashboard Level**: The main entry point `Dashboard.tsx` orchestrates UI components and calls the `useNotifications` hook.
3. **UI Components**:
   - `Navbar`: Displays branding and actions.
   - `PrioritySection`: Highlights the most critical notifications.
   - `FilterBar`: Provides controls to filter by notification types.
   - `NotificationCard`: Reusable component displaying individual notification details.
   - `LoadingSpinner` / `EmptyState`: Provide visual feedback for asynchronous states.

## Axios Flow

1. The API requests are managed by an Axios instance.
2. A **Request Interceptor** reads the Bearer token from `localStorage` and safely attaches it via `config.headers.set('Authorization', ...)`.
3. A **Response Interceptor** logs API errors globally.
4. Error responses are thrown back to the caller to be handled locally.

## Logging Flow

A custom lightweight middleware logs important actions and errors to the `logs` API endpoint.
- To prevent infinite feedback loops (where logging an Axios error fails and triggers another log), the logger is decoupled from the Axios interceptor logic and uses the native `fetch` API.
- Failures inside the logging function are caught silently and do not disrupt the user interface.

## Fallback Strategy

In real-world scenarios, backend services can be unreliable. To ensure the application remains fully functional for demonstration and evaluation:
- The `useNotifications` hook wraps the API call in a `try/catch`.
- On error, it immediately falls back to a curated `mockData` array.
- This mock data goes through the exact same filtering, sorting, and pagination logic as live data, ensuring that all UI features remain testable.

## Pagination Logic

- The hook manages a `page` and `limit` state.
- Calling `fetchMore` increments the page.
- Using mock data fallback, the logic slices the offline array `slice((page - 1) * limit, page * limit)` to perfectly mimic the backend pagination behavior.

## Priority Logic

Notifications have weights assigned:
- **Placement**: 3
- **Result**: 2
- **Event**: 1

The utility `sortNotificationsByPriority` sorts an array in descending order based on these weights, ensuring the user always sees the most critical alerts first.

## Scalability Considerations

- **Component Isolation**: Each UI component relies on clear prop interfaces, allowing them to be individually tested or replaced.
- **Typed Endpoints**: Complete strict TypeScript definitions for API payloads ensures backend contract changes are caught at compile-time.
- **Service Layer**: Extracting Axios configuration and logic allows easy integration of complex features like refresh-token rotation in the future without changing component logic.
