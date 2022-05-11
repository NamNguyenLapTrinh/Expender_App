import React from "react";

import ExpenseTable from "../compoents/expense/ExpensetTable";
import ExpenseModal from "../compoents/expense/ExpenseModal";

export default function Expense() {
  return (
    <div>
      <ExpenseModal />
      <ExpenseTable />
    </div>
  );
}
