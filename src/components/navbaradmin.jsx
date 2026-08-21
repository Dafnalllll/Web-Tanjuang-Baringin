import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaQuestionCircle,
  FaUserTie,
  FaBars,
  FaTimes,
  FaBoxOpen,
  FaExternalLinkAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import Badge from "./admin/ui/badge";
import { useFaqStats } from "../context/useFaqStats";
import tanjuangLogo from "../assets/tanjuangbaringin.webp";

const adminNavGroups = [
  {
    label: "Menu Utama",
    items: [
      { to: "/admin", label: "Dashboard", icon: FaTachometerAlt, end: true },
      { to: "/admin/faq", label: "FAQ", icon: FaQuestionCircle },
      { to: "/admin/struktur", label: "Struktur", icon: FaUserTie },
      { to: "/admin/produk", label: "Produk", icon: FaBoxOpen },
    ],
  },
];

export default function NavbarAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <>
      {/* ── Sidebar (desktop) ── */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/5 bg-emerald-950/90 backdrop-blur-xl lg:flex">
        <SidebarContent />
      </aside>

      {/* ── Drawer mobile ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-white/10 bg-emerald-950 shadow-2xl">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white"
              aria-label="Tutup menu"
            >
              <FaTimes className="h-3.5 w-3.5" />
            </button>
            <SidebarContent onNavigate={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* ── Top bar ── */}
      <header className="fixed top-0 right-0 left-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-emerald-950/90 px-4 backdrop-blur-xl lg:left-64 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 lg:hidden"
            aria-label="Buka menu"
          >
            <FaBars className="h-4 w-4" />
          </button>

          <div className="hidden sm:block">
            <p className="text-sm font-bold text-white">Panel Admin</p>
            <p className="text-[10px] uppercase tracking-widest text-slate-500">
              Nagari Tanjuang Baringin
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/4 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
          >
            <FaExternalLinkAlt className="h-3 w-3" />
            <span className="hidden sm:inline">Lihat Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 cursor-pointer rounded-lg border border-red-500/25 bg-red-500/10 px-3.5 py-2 text-xs font-semibold text-red-300 transition-all hover:bg-red-500/20"
          >
            <FaSignOutAlt className="h-3 w-3" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </header>
    </>
  );
}

/* ─── Isi sidebar (dipakai desktop & mobile) ─── */
function SidebarContent({ onNavigate }) {
  const { pendingCount } = useFaqStats();

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg border px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
      isActive
        ? "border-amber-500/25 bg-amber-500/12 text-amber-300 shadow-sm shadow-amber-500/5"
        : "border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
    }`;

  const menuCounts = {
    "/admin/faq": pendingCount,
  };

  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/5 px-5 py-5">
        <img
          src={tanjuangLogo}
          alt="Tanjuang Baringin"
          className="h-10 w-10 rounded-lg object-cover"
        />
        <div className="leading-tight">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-400/80">
            Admin
          </p>
          <p className="text-sm font-black text-white">TANJUANG BARINGIN</p>
        </div>
      </div>

      {/* Navigasi */}
      <nav className="admin-scroll flex-1 overflow-y-auto px-4 py-5">
        {adminNavGroups.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onNavigate}
                  className={navLinkClass}
                >
                  <item.icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.to !== "/admin" && (
                    <Badge
                      count={menuCounts[item.to] || 0}
                      variant={item.to === "/admin/faq" ? "amber" : "emerald"}
                      size="sm"
                      pulse
                      title={`${menuCounts[item.to] || 0} ${item.label}`}
                    />
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer sidebar */}
      <div className="border-t border-white/5 px-5 py-4">
        <p className="text-[10px] leading-relaxed text-slate-600">
          © {new Date().getFullYear()} Nagari Tanjuang Baringin
        </p>
      </div>
    </>
  );
}
