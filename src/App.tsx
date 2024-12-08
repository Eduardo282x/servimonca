import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import { Layout } from "./layouts/Layout";
import { Store } from "./pages/store/Store";
import { Rent } from "./pages/rent/Rent";
import { History } from "./pages/history/History";
import { Reports } from "./pages/reports/Reports";
import { Maintenance } from "./pages/maintenance/Maintenance";
import 'material-icons/iconfont/material-icons.css';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
              {/* Login */}
              <Route element={<AuthLayout />}>
                <Route path='/auth/login' element={<LoginPage />} />
              </Route>

              <Route element={<Layout />}>
                <Route path='/almacen' element={<Store />} />
                <Route path='/clientes' element={<Store />} />
                <Route path='/alquiler' element={<Rent />} />
                <Route path='/taller' element={<Rent />} />
                <Route path='/historial' element={<History />} />
                <Route path='/reportes' element={<Reports />} />
                <Route path='/mantenimiento' element={<Maintenance />} />
              </Route>
            </Routes>
        </BrowserRouter>
    );

}