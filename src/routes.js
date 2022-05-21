import { useRoutes, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";


import ResetPassword from "./pages/resetPassword/ResetPassword";
import ListCars from "./pages/listCars/ListCars";
import UserProfile from "./pages/userProfile/UserProfile";
import EditProfile from "./pages/userProfile/EditProfile";
import ChangePassword from "./pages/userProfile/ChangePassword";
import Active from "./pages/active/Active";
import SendOTPPage from "./pages/sendOTP/SendOTP";
import CreateInvoice from "./pages/createInvoice/CreateInvoice";
import Calendar  from "./pages/calendar/Calendar";
import Invoices from "./pages/invoices/Invoices";
import Help from "./pages/help/Help";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "", element: <Navigate to="/home" /> },
        { path: "home", element: <Home /> },
      ],
    },
    {
      path: "/login",
      element: <MainLayout />,
      children: [{ path: "", element: <Login /> }],
    },
    {
      path: "/active",
      element: <MainLayout />,
      children: [{ path: "", element: <Active /> }],
    },
    {
      path: "/signup",
      element: <MainLayout />,
      children: [{ path: "", element: <SignUp /> }],
    },
    {
      path: "/send-otp",
      element: <MainLayout />,
      children: [{ path: "", element: <SendOTPPage /> }],
    },
    {
      path: "/reset-password",
      element: <MainLayout />,
      children: [{ path: "", element: <ResetPassword /> }],
    },
    {
      path: "/cars",
      element: <MainLayout />,
      children: [{ path: "", element: <ListCars /> }],
    },
    {
      path: "/user-profile",
      element: <MainLayout />,
      children: [
        { path: "", element: <UserProfile /> },
        { path: "edit", element: <EditProfile /> },
        { path: "change-password", element: <ChangePassword /> }],
    },
    {
      path: "/create-invoice",
      element: <MainLayout />,
      children: [{ path: "", element: <CreateInvoice /> }],
    },
    {
      path: "/calendar",
      element: <MainLayout />,
      children: [{ path: "", element: <Invoices/> }],
    },
    {
      path: "/invoices",
      element: <MainLayout />,
      children: [{ path: "", element: <Invoices/> }],
    },
    {
      path: "/help",
      element: <MainLayout />,
      children: [{ path: "", element: <Help/> }],
    },
  ]);
};

export default Router;
