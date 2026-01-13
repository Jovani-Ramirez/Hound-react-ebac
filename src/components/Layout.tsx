import { Outlet } from "react-router-dom";

import type { JSX } from "react";
import { Footer } from "./Footer";
import Header from "./Header";

export default function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
