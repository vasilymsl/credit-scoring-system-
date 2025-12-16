import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, ScoringModelsPage, ScoringModelDetailPage } from "./pages";
import { ROUTES } from "./Routes";
import { NavbarComp } from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <NavbarComp />
      <div className="app-container">
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.SERVICES} element={<ScoringModelsPage />} />
          <Route path={`${ROUTES.SERVICES}/:id`} element={<ScoringModelDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

