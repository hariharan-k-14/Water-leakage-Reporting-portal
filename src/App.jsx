import { useState } from "react";

import Navbar from "./components/navbar";
import Hero from "./components/Hero";

import ReportPage from "./pages/ReportPage";
import TrackPage from "./pages/TrackPage";
import AdminPage from "./pages/AdminPage";
function App() {

  const [page, setPage] = useState("home");

  return (
    <div>

      <Navbar setPage={setPage} />

      {page === "home" && (
        <Hero setPage={setPage} />
      )}

      {page === "report" && (
        <ReportPage />
      )}

      {page === "track" && (
        <TrackPage />
    
       
      )}
       {page === "admin" && (
  <AdminPage />
        )}

    </div>
  );
}

export default App;