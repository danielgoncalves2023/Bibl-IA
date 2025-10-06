import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { LoginPage } from "../pages/LoginPage";
import { BibleReaderPage } from "../pages/BibleReaderPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <BibleReaderPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/bible",
    element: (
      <ProtectedRoute>
        <BibleReaderPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/bible/:testamentId",
    element: (
      <ProtectedRoute>
        <BibleReaderPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/bible/:testamentId/:bookId",
    element: (
      <ProtectedRoute>
        <BibleReaderPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/bible/:testamentId/:bookId/:chapterId",
    element: (
      <ProtectedRoute>
        <BibleReaderPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
