import { useState } from "react";
import { CustomerList } from "../components/customers/components/customerList";
import { CustomerAddForm } from "../components/customers/components/customerAddForm";

export default function AdminCustomers() {
  const [addOpen, setAddOpen] = useState(false);
  return (
    <div>
  <div className="flex items-center justify-between mb-4">
  <h1 className="text-lg font-medium text-slate-900">Customers</h1>
  <button
    onClick={() => setAddOpen(true)}
    className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 transition-colors"
  >
    Add customer
  </button>
</div>
<CustomerList />
<CustomerAddForm open={addOpen} onClose={() => setAddOpen(false)} />
  </div>
  )
}
