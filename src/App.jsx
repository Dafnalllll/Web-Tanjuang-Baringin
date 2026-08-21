import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/mainlayout";
import Home from "./pages/Home";
import TanjuangBaringin from "./pages/TanjuangBaringin";
import Tentang from "./pages/Tentang";
import FaqPage from "./pages/Lainnya";
import Lembaga from "./pages/Lembaga";
import DataNagari from "./pages/DataNagari";
import Pelayanan from "./pages/Pelayanan";
import Ppid from "./pages/Ppid";
import Produk from "./pages/Produk";
import AdminLayout from "./layouts/adminlayout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminFaq from "./pages/admin/AdminFaq";
import AdminStruktur from "./pages/admin/AdminStruktur";
import AdminProduk from "./pages/admin/AdminProduk";
import { AdminDataProvider } from "./context/AdminDataProvider";
import NotFound from "./pages/Notfound";
import Auth from "./pages/auth";
import ProtectedRoute from "./routes/ProtectedRoute";
import RouteTransition from "./components/RouteTransition";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <ScrollToTop />
      <RouteTransition>
        <Routes>
          <Route path="/" element={<TanjuangBaringin />} />
          <Route path="/login" element={<Auth />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<Tentang />} />
            <Route path="/about/*" element={<Tentang />} />
            <Route path="/lembaga/*" element={<Lembaga />} />
            <Route path="/data-nagari/*" element={<DataNagari />} />
            <Route path="/pelayanan/*" element={<Pelayanan />} />
            <Route path="/ppid" element={<Ppid />} />
            <Route path="/produk-nagari" element={<Produk />} />
            <Route path="/lainnya/faq" element={<FaqPage />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDataProvider>
                  <AdminLayout />
                </AdminDataProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="faq" element={<AdminFaq />} />
            <Route path="struktur" element={<AdminStruktur />} />
            <Route path="produk" element={<AdminProduk />} />
          </Route>
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </RouteTransition>
    </BrowserRouter>
  );
}
