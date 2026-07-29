import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/mainlayout";
import Home from "./pages/Home";
import TanjuangBaringin from "./pages/TanjuangBaringin";
import Tentang from "./pages/Tentang";
import FaqPage from "./pages/Lainnya";
import Lembaga from "./pages/Lembaga";
import DataNagari from "./pages/DataNagari";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TanjuangBaringin />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<Tentang />} />
          <Route path="/about/*" element={<Tentang />} />
          <Route path="/lembaga/*" element={<Lembaga />} />
          <Route path="/data-nagari/*" element={<DataNagari />} />
          <Route path="/lainnya/faq" element={<FaqPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
