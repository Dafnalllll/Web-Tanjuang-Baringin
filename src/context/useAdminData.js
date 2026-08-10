import { useContext } from "react";
import { AdminDataContext } from "./adminDataContext";

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) {
    throw new Error("useAdminData harus dipakai di dalam <AdminDataProvider>");
  }
  return ctx;
}
