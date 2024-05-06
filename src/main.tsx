import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from '@feature/home/pages/HomePage';
import NotFoundPage from '@shared/components/NotFoundPage';
import UserAdminPage from '@/feature/users/pages/UserAdminPage';
import UserProfilePage from '@feature/users/pages/UserProfilePage';
import UserProfilesPage from '@feature/users/pages/UserProfilesPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const APP_ROUTER = createBrowserRouter([
  { 
    path: "/", 
    element: <HomePage /> ,
    errorElement: <NotFoundPage />
  },
  { 
    path: "/usuarios", 
    element: <UserAdminPage /> 
  },
  {
    path: "/user-profiles",
    element: <UserProfilesPage />,
    children: [
      {
        path: "/user-profiles/:profileId",
        element: <UserProfilePage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={APP_ROUTER} />
  </React.StrictMode>,
)
