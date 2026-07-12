import { useLocation } from "react-router-dom";
import Sejarah from "../components/section/tentang/sejarah";
import VisiMisi from "../components/section/tentang/visimisi";

export default function Tentang() {
  const { pathname } = useLocation();

  if (pathname === "/about/visi-misi") {
    return <VisiMisi />;
  }

  return <Sejarah />;
}
