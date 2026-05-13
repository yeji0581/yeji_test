import { Route, Routes } from "react-router-dom";

import { Page } from "@/pages/Page";

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <main className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-semibold">yeji_test</h1>
          </main>
        }
      />
      <Route path="/page" element={<Page />} />
    </Routes>
  );
}
