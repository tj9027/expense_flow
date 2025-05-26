import { useData } from "@/store/store";
import { useState } from "react";
import ExpenseDetails from "./card";
import { Expense, StatusMap } from "@/types/types";

const ExpenseList = () => {
  const { expenses } = useData();
  const [selectedExpense, setSelectedExpense] = useState<Expense>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (expense: Expense) => {
    setSelectedExpense(expense);
    console.log("Selected expense:", expense);
    setIsModalOpen(true);
  };

  return (
    <div className="p-20 flex flex-col items-starts justify-start h-screen bg-gray-100 col-span-5 border-r-2 border-gray-300 text-gray-700">
      <h1 className="text-xl font-bold">Expense List</h1>
      <hr className="border border-gray-300" />
      <div className="p-10 max-w-[80%]">
        {!expenses ? (
          <div>No expenses available or not logged in</div>
        ) : (
          <div className="rounded-lg border-1 border-gray-300 overflow-hidden shadow-sm">
            <table className="min-w-full border-collapse overflowx-scroll">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Description</th>
                  <th className="border border-gray-300 p-2">Amount</th>
                  <th className="border border-gray-300 p-2">Submitter</th>
                  <th className="border border-gray-300 p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {expenses?.map((expense) => (
                  <tr
                    key={expense.id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleRowClick(expense)}
                  >
                    <td className="border border-gray-300 p-2">
                      {expense.name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ${expense.amount}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {expense.submitter?.name || "Unknown"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {StatusMap[expense.status as keyof typeof StatusMap]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {isModalOpen && selectedExpense && (
        <ExpenseDetails
          onClose={() => setIsModalOpen(false)}
          expenseId={selectedExpense.id}
        />
      )}
    </div>
  );
};
export default ExpenseList;
