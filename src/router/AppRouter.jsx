import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import TestCasesPage from "../pages/TestCasesPage";
import TestCaseDetailPage from "../pages/TestCaseDetailPage";
import Navigation from "../components/common/Navigation";
import "./AppRouter.css";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/*" element={
          <div className="app-layout">
            <Navigation />
            <main className="app-main">
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/test-cases" element={<TestCasesPage />} />
                <Route path="/test-cases/:id" element={<TestCaseDetailPage />} />
              </Routes>
            </main>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
