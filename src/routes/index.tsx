import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layout
import RootLayout from "@/layout/root-layout";

// pages
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import VerifyOtp from "@/pages/auth/otp";
import Home from "@/pages/home";
import UpdatePassword from "@/pages/password/update-password";

export default function Router() {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/otp", element: <VerifyOtp /> },
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "update-password", element: <UpdatePassword /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
