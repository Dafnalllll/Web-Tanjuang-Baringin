import { Link } from "react-router-dom";
import { MdLogin } from "react-icons/md";

export default function Login() {
  return (
    <Link
      to="/login"
      className="
        inline-flex items-center gap-2
        rounded-xl
        border border-amber-400/20
        bg-linear-to-r from-amber-500 to-yellow-400
        px-4 py-2
        text-xs font-bold uppercase tracking-wider
        text-emerald-950
        transition-all duration-300
        hover:scale-105
        hover:shadow-lg hover:shadow-amber-500/20
      "
    >
      <MdLogin className="h-4 w-4" />
      Login
    </Link>
  );
}
