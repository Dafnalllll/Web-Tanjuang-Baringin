import { useLocation } from "react-router-dom";
import Sejarah from "../components/section/tentang/sejarah";
import VisiMisi from "../components/section/tentang/visimisi";
import Struktur from "../components/section/tentang/struktur";

export default function Tentang() {
  const { pathname } = useLocation();

  if (pathname === "/about/visi-misi") {
    return <VisiMisi />;
  }

  if (pathname === "/about/struktur") {
    return <Struktur />;
  }

  return <Sejarah />;
}
