import React from "react";
import { Routes, Route } from "react-router-dom";
import Error403 from "../page/ANONYMOUS/Error403";
import Error404 from "../page/ANONYMOUS/Error404";
import PrivateRoute from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { ROUTER } from "./Router";
import LoginPage from "src/page/ANONYMOUS/LoginPage";
import Dashboard from "src/page/ADMIN/Dashboard";
import RoomManager from "src/page/ADMIN/RoomManager";
import UserManager from "src/page/ADMIN/UserManager";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path={ROUTER.LOGIN}
        element={
          <PublicRouter>
            <LoginPage />
          </PublicRouter>
        }
      />
      {/* ADMIN */}
      <Route
        path={ROUTER.DASHBOARD}
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTER.BOOKING}
        element={
          <PrivateRoute>
            <div />
            BOOKING
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTER.BOOKING_MANAGER}
        element={
          <PrivateRoute>
            <div />
            BOOKING_MANAGER
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTER.ROOM_TYPE_MANAGER}
        element={
          <PrivateRoute>
            <div />
            ROOM_TYPE_MANAGER
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTER.ROOM_MANAGER}
        element={
          <PrivateRoute>
            <RoomManager />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTER.SERVICES_MANAGER}
        element={
          <PrivateRoute>
            <div />
            SERVICES_MANAGER
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTER.DEVICES_MANAGER}
        element={
          <PrivateRoute>
            <div />
            DEVICES_MANAGER
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTER.CUSTOMERS_MANAGER}
        element={
          <PrivateRoute>
            <UserManager />
          </PrivateRoute>
        }
      />
      <Route path="/403" element={<Error403 />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRouter;
