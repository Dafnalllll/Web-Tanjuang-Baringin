import { Outlet } from "react-router-dom";
import NavbarAdmin from "../components/navbaradmin";
import { ToastProvider } from "../components/admin/ui/Toast";

export default function AdminLayout() {
  return (
    <ToastProvider>
      <div className="relative min-h-screen bg-emerald-950">
        {/* ── Background dekoratif ── */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fcd34d' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="fixed top-20 -left-32 h-96 w-96 rounded-full bg-amber-900/10 blur-[120px] pointer-events-none" />
        <div className="fixed bottom-40 -right-40 h-80 w-80 rounded-full bg-yellow-800/10 blur-[100px] pointer-events-none" />

        <NavbarAdmin />

        <main className="relative z-10 min-h-screen pt-16 lg:pl-64">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
