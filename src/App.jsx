import './App.css'
import React from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import AuthPage from './page/AuthPage';
import LoginProvider from './store/LoginProvider';
import ProtectedRoute from './store/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatPage from './page/ChatPage';
import IndustryDisasterPage from './page/IndustryDisasterPage';
import MyPage from './page/MyPage';

const router = createBrowserRouter([

  { path : '/' , 
    element: (
      <ProtectedRoute>
        <IndustryDisasterPage/>
      </ProtectedRoute>
    ),
  },
  {
    path : '/auth',
    element : <AuthPage/>
  },
  {
    path : '/chat',
    element: (
      <ProtectedRoute>
        <ChatPage/>
      </ProtectedRoute>
    ),
  },
  {
    path : '/me',
    element: (
      <ProtectedRoute>
        <MyPage/>
      </ProtectedRoute>
    ),
  },
]);


function App() {
  
  return (
    <>
      <LoginProvider>
        <ToastContainer 
          toastClassName="custom-toast-container"
          bodyClassName="custom-toast-body"/>
        <RouterProvider router={router}/>
      </LoginProvider>
    </>
  )
}

export default App
