import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layout
import RootLayout from "@/layout/root-layout";

// pages
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import VerifyOtp from "@/pages/auth/otp";

export default function Router() {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/otp", element: <VerifyOtp /> },
    {
      path: "/",
      element: <RootLayout />,
      children: [{ index: true, element: "Home" }],
    },
  ]);

  return <RouterProvider router={router} />;
}
