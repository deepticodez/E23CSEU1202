# Notification System Frontend

A professional, responsive notification dashboard built for the campus hiring evaluation project.

## 🚀 Overview

This project is a React-based frontend application that displays user notifications in a clean, professional dashboard. It features priority sorting, pagination, filtering, and robust error handling with fallback mock data when the backend APIs are unavailable.

## 🛠 Technologies Used

- **React 18**
- **TypeScript**
- **Vite**
- **Material UI (MUI)**
- **Axios**

## ✨ Features

- **Responsive Design**: Fully responsive interface using Material UI.
- **Priority Sorting**: Notifications are sorted based on their priority (placement > result > event).
- **Filtering**: Users can filter notifications by type.
- **Pagination**: Seamless loading of more notifications.
- **Robust Error Handling**: If the API fails, the application automatically falls back to an offline mock dataset, ensuring the UI remains fully functional.
- **Centralized Logging**: Custom logger middleware to centralize tracking.

## 📦 Setup Instructions

1. **Install Dependencies**
   ```bash
   cd notification_app_fe
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🏗 Architecture & Assumptions

- **Mock Fallback**: We assume the API may be flaky or unavailable. A `mockData.ts` file acts as a fallback to ensure the evaluation dashboard can be reviewed perfectly under all conditions.
- **Interceptor Safety**: The Axios interceptor automatically manages the Bearer token and safely assigns it without polluting generic objects.
- **Logger Safety**: The logger uses the native `fetch` API to avoid cyclic infinite loops with Axios error interceptors.

## 📸 Screenshots

*(Placeholder for Screenshots)*
