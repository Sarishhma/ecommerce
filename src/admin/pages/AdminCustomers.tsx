import { useState } from "react";
import { CustomerList } from "../components/customers/components/customerList";
import { CustomerAddForm } from "../components/customers/components/customerAddForm";

export default function AdminCustomers() {
  const [addOpen, setAddOpen] = useState(false);
  return (
    <div className="animate-fade-in pb-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-stone font-semibold mb-1">Management</p>
          <h1 className="text-3xl font-display text-charcoal">Customers</h1>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="rounded-xl bg-terracotta px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-copper transition-colors shadow-sm"
        >
          Add Customer
        </button>
      </div>
      <CustomerList />
      <CustomerAddForm open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}
