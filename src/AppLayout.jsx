import React from 'react';
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/main/Header.jsx";
import Footer from "./components/main/Footer.jsx";

function AppLayout() {
  return (
    <>
      <ScrollRestoration />

      <div className="w-full min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div dir="rtl" className="flex flex-col flex-1">
          <main className="w-full pt-16 px-0">
            <Outlet />
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default AppLayout;
