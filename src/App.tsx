import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";

export default function App() {

    return (

        <BrowserRouter>
        
            <Routes>

              {/* Login */}
              <Route element={<AuthLayout />}>

                <Route path='/auth/login' element={<LoginPage />} />

              </Route>

            </Routes>
        
        </BrowserRouter>

    );

}