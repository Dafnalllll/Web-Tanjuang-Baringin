import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Sejarah from "../components/section/tentang/sejarah";
import VisiMisi from "../components/section/tentang/visimisi";
import Struktur from "../components/section/tentang/struktur";

export default function Tentang() {
  const { pathname } = useLocation();

  if (pathname === "/about/visi-misi") {
    return (
      <>
        <Helmet>
          <title>Visi dan Misi Nagari Tanjuang Baringin</title>

          <meta
            name="description"
            content="Visi dan misi Pemerintah Nagari Tanjuang Baringin Kabupaten Pasaman."
          />

          <link
            rel="canonical"
            href="https://www.tanjuangbaringin.web.id/about/visi-misi"
          />
        </Helmet>

        <VisiMisi />
      </>
    );
  }

  if (pathname === "/about/struktur") {
    return (
      <>
        <Helmet>
          <title>Struktur Organisasi Nagari Tanjuang Baringin</title>

          <meta
            name="description"
            content="Struktur organisasi Pemerintah Nagari Tanjuang Baringin Kabupaten Pasaman."
          />

          <link
            rel="canonical"
            href="https://www.tanjuangbaringin.web.id/about/struktur"
          />
        </Helmet>

        <Struktur />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Sejarah Nagari Tanjuang Baringin</title>

        <meta
          name="description"
          content="Sejarah berdirinya Nagari Tanjuang Baringin Kabupaten Pasaman."
        />

        <link
          rel="canonical"
          href="https://www.tanjuangbaringin.web.id/about"
        />
      </Helmet>

      <Sejarah />
    </>
  );
}
