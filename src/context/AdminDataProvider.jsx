import { useCallback, useMemo, useState } from "react";
import { faqSeed } from "../data/faqSeed";
import { strukturSeed } from "../data/strukturSeed";
import { AdminDataContext } from "./adminDataContext";

/* ─── Helper id ─── */
let nextFaqId = 10000;
const genFaqId = () => ++nextFaqId;

let nextStrukturId = 10000;
const genStrukturId = () => ++nextStrukturId;

export function AdminDataProvider({ children }) {
  const [faqs, setFaqs] = useState(faqSeed);
  const [struktur, setStruktur] = useState(strukturSeed);

  /* ── FAQ ── */
  const addFaq = useCallback((data) => {
    const newFaq = { id: genFaqId(), ...data };
    setFaqs((prev) => [newFaq, ...prev]);
    return newFaq;
  }, []);

  const updateFaq = useCallback((id, data) => {
    setFaqs((prev) => prev.map((item) => (item.id === id ? { ...item, ...data } : item)));
  }, []);

  const deleteFaq = useCallback((id) => {
    setFaqs((prev) => prev.filter((item) => item.id !== id));
  }, []);

  /* ── Struktur ── */
  const addStruktur = useCallback((data) => {
    const newPerson = { id: genStrukturId(), ...data };
    setStruktur((prev) => [...prev, newPerson]);
    return newPerson;
  }, []);

  const updateStruktur = useCallback((id, data) => {
    setStruktur((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...data } : item)),
    );
  }, []);

  const deleteStruktur = useCallback((id) => {
    setStruktur((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      faqs,
      addFaq,
      updateFaq,
      deleteFaq,
      struktur,
      addStruktur,
      updateStruktur,
      deleteStruktur,
    }),
    [faqs, struktur, addFaq, updateFaq, deleteFaq, addStruktur, updateStruktur, deleteStruktur],
  );

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
}
