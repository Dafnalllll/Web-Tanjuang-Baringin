import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/mainlayout";
import Home from "./pages/Home";
import TanjuangBaringin from "./pages/TanjuangBaringin";
import Tentang from "./pages/Tentang";
import FaqPage from "./pages/Lainnya";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TanjuangBaringin />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<Tentang />} />
          <Route path="/about/sejarah" element={<Tentang />} />
          <Route path="/about/visi-misi" element={<Tentang />} />
          <Route path="/lainnya/faq" element={<FaqPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
