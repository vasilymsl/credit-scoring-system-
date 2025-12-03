import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, ServicesPage, ServiceDetailPage } from "./pages";
import { ROUTES } from "./Routes";
import { NavbarComp } from "./components/Navbar";
import { dest_root } from "./target_config";

function App() {
  return (
    <BrowserRouter basename={dest_root}>
      <NavbarComp />
      <div className="app-container">
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
          <Route path={`${ROUTES.SERVICES}/:id`} element={<ServiceDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

